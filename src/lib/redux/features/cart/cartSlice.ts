import { CartItem, Product } from "@/type/common";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RootState } from "../../store";
import {
  addToCart,
  clearCartFromServer,
  removeFromCart,
  useGetMyCert,
} from "@/lib/requests/user/product";
import { useAppSelector } from "../../hooks";
import { UserType } from "../auth/authSlice";
import requests from "@/utils/requests";
import { navigate } from "@/app/actions";

interface CartState {
  items: { product: Product; quantity: number }[];
  isLoggedIn: boolean;
  addingToCart: {
    state: boolean;
    product: Product | null;
  };
}

const initialState: CartState = {
  items: [],
  isLoggedIn: false,
  addingToCart: {
    state: false,
    product: null,
  },
};

// export const syncCartWithServer = createAsyncThunk(
//   "cart/syncCartWithServer",
//   async (items: { product: Product; quantity: number }[], { getState }) => {
//     const state = getState() as RootState;
//     if (state.auth.data && state.auth.type == UserType.CUSTOMER) {
//       // Replace with your API call

//       state.cart.items.forEach(element => {
//         addToCart(element.product._id, element.quantity)
//       });

//       // if (!response.ok) {
//       //   throw new Error("Failed to sync cart with server");
//       // }
//     }
//   }
// );

export const syncCartWithServer = createAsyncThunk(
  "cart/syncCartWithServer",
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (state.auth.data && state.auth.type == UserType.CUSTOMER) {
      // Collect all promises in an array
      const cartPromises = state.cart.items.map((element) =>
        addToCart(element.product._id, element.quantity)
      );

      // Wait for all promises to resolve
      const resp = await Promise.all(cartPromises);

      console.log(resp);

      // You can handle the results or catch errors if needed
      // Example: handling results if `addToCart` returns something
      // const results = await Promise.all(cartPromises);
      // Handle the `results` if necessary

      // If any of the promises fail, an error will be thrown
      // Catch block can be used at the calling function level if needed
    }
  }
);

export const addItemToServer = createAsyncThunk(
  "cart/addItemToServer",
  async (
    {
      product,
      quantity,
      type,
    }: {
      product: Product;
      quantity: number;
      type?: "productCard" | "cartCard" | "productPage";
    },
    { getState }
  ) => {
    const state = getState() as RootState;

    if (type == "productCard") {
      const existingItem = state.cart.items.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        quantity = existingItem?.quantity + 1;
      }
    }

    // let qty = quantity;

    // const existingItem = state.cart.items.find(
    //   (item) => item.product._id === product._id
    // );

    // if (existingItem) {
    //   qty = existingItem.quantity + quantity;
    // }

    const response = await addToCart(product._id, quantity);
    console.log(response);

    if (response.status !== "success") {
      throw new Error("Failed to remove item from server cart");
    }

    return { product, quantity, type };
  }
);

export const fetchCartFromServer = createAsyncThunk(
  "cart/fetchCartFromServer",
  async (_, { getState }) => {
    const state = getState() as RootState;

    if (state.auth.data) {
      const rest = await requests.get<{ cart: CartItem[] }>(
        `/customer/my-cart`
      );

      console.log("rest", rest);

      if (rest.data) {
        const certData = rest.data.cart.map((e) => {
          const p: { product: Product; quantity: number } = {
            quantity: e.quantity,
            product: e.productId,
          };

          return p;
        });

        console.log("certData", certData);

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

export const clearCertFromServer = createAsyncThunk(
  "cart/clearCertFromServer",
  async (_, { getState }) => {
    const state = getState() as RootState;

    const response = await clearCartFromServer();
    if (response.status !== "success") {
      throw new Error("Failed to remove item from server cart");
    }

    return [];
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
      action: PayloadAction<{
        product: Product;
        quantity: number;
        type: "productCard" | "cartCard" | "productPage";
      }>
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

      if (action.payload.type == "productPage") {
        navigate("/marketplace/cart");
      }
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
    clearCart: (state) => {
      state.items = [];

      toast(`Cart cleared`, {
        description: `Cart cleared`,
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
        existingItem.quantity = action.payload.quantity;
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

      if (action.payload.type == "productPage") {
        navigate("/marketplace/cart");
      }

      state.addingToCart.state = false;
      state.addingToCart.product = null;

      console.log("Item successfully added to server");
    });
    builder.addCase(addItemToServer.rejected, (state, action) => {
      state.addingToCart.state = false;
      state.addingToCart.product = null;
      console.error("Failed to add item to server:", action.error.message);
    });
    builder.addCase(addItemToServer.pending, (state, action) => {
      state.addingToCart.state = true;
      state.addingToCart.product = action.meta.arg.product;
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
      if (action.payload) state.items = action.payload;

      console.log("action.payload", state.items);

      // Initialize state with fetched data
    });
    builder.addCase(fetchCartFromServer.rejected, (state, action) => {
      console.error("Failed to fetch cart from server:", action.error.message);
    });

    builder.addCase(clearCertFromServer.fulfilled, (state, action) => {
      if (action.payload) state.items = action.payload;

      toast(`Cart cleared`, {
        description: `Cart cleared`,
        action: {
          label: "Cart",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });
    });
    builder.addCase(clearCertFromServer.rejected, (state, action) => {
      console.error("Failed to fetch cart from server:", action.error.message);
    });
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
