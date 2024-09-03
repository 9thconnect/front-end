import { Product } from "@/type/common";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RootState } from "../../store";
import {
  addToCart,
  removeFromCart,
  useGetMyCert,
} from "@/lib/requests/user/product";
import { useAppSelector } from "../../hooks";
import { UserType } from "../auth/authSlice";

interface CartState {
  items: { product: Product; quantity: number }[];
  isLoggedIn: boolean;
}

const initialState: CartState = {
  items: [],
  isLoggedIn: false,
};

export const syncCartWithServer = createAsyncThunk(
  "cart/syncCartWithServer",
  async (items: { product: Product; quantity: number }[], { getState }) => {
    const state = getState() as RootState;
    if (state.cart.isLoggedIn) {
      // Replace with your API call
      const response = await fetch("/api/cart/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });
      if (!response.ok) {
        throw new Error("Failed to sync cart with server");
      }
    }
  }
);

export const addItemToServer = createAsyncThunk(
  "cart/addItemToServer",
  async (
    { product, quantity }: { product: Product; quantity: number },
    { getState }
  ) => {
    const state = getState() as RootState;

    const response = await addToCart(product._id);
    console.log(response);

    if (response.status !== "success") {
      throw new Error("Failed to remove item from server cart");
    }

    return { product, quantity };
  }
);

export const fetchCartFromServer = createAsyncThunk(
  "cart/fetchCartFromServer",
  async (_, { getState }) => {
    const state = getState() as RootState;

    if (state.auth.data) {
      const rest = useGetMyCert(state.auth.data._id);

      if (rest.data?.data) {
        const certData = rest.data.data.map((e) => {
          const p: { product: Product; quantity: number } = {
            quantity: e.quantity,
            product: e.product,
          };

          return p;
        });

        return certData;
      }
      return [];
    }
  }
);

export const removeItemFromServer = createAsyncThunk(
  "cart/removeItemFromServer",
  async ({ id, quantity }: { id: string; quantity: number }, { getState }) => {
    const state = getState() as RootState;

    const response = await removeFromCart(id);
    if (response.status !== "success") {
      throw new Error("Failed to remove item from server cart");
    }

    return { id, quantity };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    addItem: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      // Show toast notification
      toast(`Product added to cart`, {
        description: `${action.payload.product.name} added to cart`,
        action: {
          label: "Cart",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item) => item.product._id === action.payload
      );
      if (index !== -1) {
        const removedItem = state.items.splice(index, 1)[0];
        toast(`Product removed from cart`, {
          description: `${removedItem.product.name} removed from cart`,
          action: {
            label: "Cart",
            onClick: () => console.log("Undo"),
            actionButtonStyle: {
              backgroundColor: "#ab0505b9",
              color: "#880b0bf",
            },
          },
        });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.product._id === action.payload.id
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
        toast(`Product quantity updated`, {
          description: `${state.items[index].product.name} quantity updated to ${action.payload.quantity}`,
          action: {
            label: "Cart",
            onClick: () => console.log("Undo"),
            actionButtonStyle: {
              backgroundColor: "#ab0505b9",
              color: "#880b0bf",
            },
          },
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToServer.fulfilled, (state, action) => {
      const existingItem = state.items.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      // Show toast notification
      toast(`Product added to cart`, {
        description: `${action.payload.product.name} added to cart`,
        action: {
          label: "Cart",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });

      console.log("Item successfully added to server");
    });
    builder.addCase(addItemToServer.rejected, (state, action) => {
      console.error("Failed to add item to server:", action.error.message);
    });
    builder.addCase(removeItemFromServer.fulfilled, (state, action) => {
      console.log(
        "Item successfully removed from server",
        action.payload.quantity
      );

      const index = state.items.findIndex(
        (item) => item.product._id === action.payload.id
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
        toast(`Product quantity updated`, {
          description: `${state.items[index].product.name} quantity updated to ${state.items[index].quantity}`,
          action: {
            label: "Cart",
            onClick: () => console.log("Undo"),
            actionButtonStyle: {
              backgroundColor: "#ab0505b9",
              color: "#880b0bf",
            },
          },
        });
      }
    });
    builder.addCase(removeItemFromServer.rejected, (state, action) => {
      console.error("Failed to remove item from server:", action.error.message);
    });

    builder.addCase(fetchCartFromServer.fulfilled, (state, action) => {
      state.items = action.payload || []; // Initialize state with fetched data
    });
    builder.addCase(fetchCartFromServer.rejected, (state, action) => {
      console.error("Failed to fetch cart from server:", action.error.message);
    });
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
