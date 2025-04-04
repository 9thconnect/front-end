import { CartItem, Product } from "@/type/common";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RootState } from "../../store";
import {
  addToCart,
  clearCartFromServer,
  decreaseFromCart,
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
  deletingProductFromCart: {
    state: boolean;
    product: string | null;
  };

  clearingCart: boolean;
}

const initialState: CartState = {
  items: [],
  isLoggedIn: false,
  addingToCart: {
    state: false,
    product: null,
  },
  deletingProductFromCart: {
    state: false,
    product: null,
  },
  clearingCart: false,
};

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
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;

    let localQty = quantity;

    console.log("Initial product:", product);
    console.log("Initial type:", type);

    const existingItem = state.cart.items.find(
      (item) => item.product._id === product._id
    );
    console.log("Existing item found:", existingItem);

    console.log("Initial localQty:", localQty);

    if (product.productSaleType == "b2b" && product.minimumOrder) {
      console.log("B2B product with minimum order:", product.minimumOrder);

      console.log("jkafjjejejeej", type, existingItem, product.minimumOrder);

      if (existingItem && product.minimumOrder > existingItem?.quantity) {
        localQty = existingItem?.quantity + 1;
        console.log(
          "Case 1: Existing item quantity less than minimum order. New localQty:",
          localQty
        );
      } else if (
        existingItem &&
        product.minimumOrder <= existingItem?.quantity &&
        type == "productCard"
      ) {
        console.log(
          "Case 3: Existing item quantity more than minimum order, but it is from product card. New localQty:",
          localQty
        );

        localQty = existingItem?.quantity + 1;
      } else if (
        existingItem &&
        product.minimumOrder < existingItem?.quantity
      ) {
        // localQty = product.minimumOrder;
        console.log(
          "Case 2: Existing item quantity more than minimum order. New localQty:",
          localQty
        );
      } else if (!existingItem) {
        localQty = product.minimumOrder;
      }
    } else {
      console.log("final step in the if");

      if (existingItem) {
        localQty = existingItem?.quantity + 1;
        console.log(
          "Non-B2B or no minimum order: Incrementing quantity. New localQty:",
          localQty
        );
      }
    }

    console.log("Final localQty:", localQty);

    console.log("Final localQty:", localQty);
    try {
      console.log(
        "quantity",
        localQty,
        product.productSaleType,
        product.minimumOrder,
        "newww"
      );

      const response = await addToCart(product._id, localQty);
      console.log(response);

      if (response.status !== "success") {
        return rejectWithValue(response);
      }

      return { product, quantity: localQty, type };
    } catch (error: any) {
      // Handle Axios error with response data
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }

      // Fallback for other types of errors
      return rejectWithValue({
        message: error.message || "An unknown error occurred",
        status: "error",
        statusCode: 500,
      });
    }
  }
);

export const decreaseItemFromServer = createAsyncThunk(
  "cart/decreaseItemFromServer",
  async (
    {
      product,
      quantity,
    }: {
      product: Product;
      quantity: number;
    },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;

    console.log("quantity, minimumOrder", quantity, product.minimumOrder);

    try {
      if (
        product.productSaleType == "b2b" &&
        product.minimumOrder &&
        quantity <= product.minimumOrder
      ) {
        return rejectWithValue({
          message: "You cannot decrease lower than the minimum order",
          status: "error",
          statusCode: 400,
        });
      }
      const response = await decreaseFromCart(product._id);
      console.log(response);

      if (response.status !== "success") {
        return rejectWithValue(response);
      }

      return { product, quantity: quantity - 1 };
    } catch (error: any) {
      // Handle Axios error with response data
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }

      // Fallback for other types of errors
      return rejectWithValue({
        message: error.message || "An unknown error occurred",
        status: "error",
        statusCode: 500,
      });
    }
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

      if (rest.data) {
        const certData = rest.data.cart.map((e) => {
          const p: { product: Product; quantity: number } = {
            quantity: e.quantity,
            product: e.productId,
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
      console.log("this is product", action.payload.product);

      if (!action.payload.product.weight) {
        toast(`This product cannot be added to cart`, {
          description: `This product cannot be added to cart, please contact us for more information`,
        });

        return;
      }

      let firstItem = state.items[0];

      // Check if the new product can be added to the cart
      if (
        firstItem &&
        firstItem.product &&
        firstItem.product.productSaleType !==
          action.payload.product.productSaleType
      ) {
        toast(`We cannot add this product to your cart`, {
          description: `You cannot mix wholesale and retail products, please clear cart first`,
          action: {
            label: "Cart",
            onClick: () => console.log("Undo"),
            actionButtonStyle: {
              backgroundColor: "#ab0505b9",
              color: "#880b0bf",
            },
          },
        });

        return;
      }

      console.log("this is b2b", action.payload.product);

      const existingItem = state.items.find(
        (item) => item.product._id === action.payload.product._id
      );

      let localQty = action.payload.quantity;

      // if (action.payload.type === "productCard") {
      // Handle B2B product with minimum order requirements

      if (
        action.payload.product.productSaleType === "b2b" &&
        action.payload.product.minimumOrder
      ) {
        if (existingItem) {
          if (existingItem.quantity < action.payload.product.minimumOrder) {
            localQty = existingItem.quantity + 1;
          } else if (
            existingItem.quantity > action.payload.product.minimumOrder
          ) {
            localQty = action.payload.product.minimumOrder;
          }
        } else {
          localQty = action.payload.product.minimumOrder;
        }
      } else {
        // For non-B2B or products without minimum order
        if (existingItem) {
          localQty = existingItem.quantity + 1;
        }
      }
      // }

      // Add or update the item in the cart
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: localQty,
        });
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

      if (action.payload.type === "productPage") {
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
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      if (!action.payload.product.weight) {
        toast(`This product cannot be added to cart`, {
          description: `This product cannot be added to cart, please contact us for more information`,
          action: {
            label: "Cart",
            onClick: () => console.log("Undo"),
            actionButtonStyle: {
              backgroundColor: "#ab0505b9",
              color: "#880b0bf",
            },
          },
        });

        return;
      }

      const index = state.items.findIndex(
        (item) => item.product._id === action.payload.product._id
      );

      if (index !== -1) {
        if (
          action.payload.product.productSaleType == "b2b" &&
          state.items[index].quantity > action.payload.quantity &&
          action.payload.product.minimumOrder &&
          state.items[index].quantity <= action.payload.product.minimumOrder
        ) {
          toast.error(`You cannot go beyond the minimum order`, {
            description: `You cannot go below the minimum order for this product, minimum is ${action.payload.product.minimumOrder}`,
            action: {
              label: "Cart",
              onClick: () => console.log("Undo"),
              actionButtonStyle: {
                backgroundColor: "#ab0505b9",
                color: "#880b0bf",
              },
            },
          });

          return;
        }
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
      console.log(state, action);

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

      const errorPayload = action.payload as {
        message: string;
        status: string;
        statusCode: number;
      };

      const errorMessage =
        errorPayload?.message || "Failed to add item to cart";

      toast(`We cannot add product to cart`, {
        description: errorMessage,
        action: {
          label: "Cart",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });

      console.error("Failed to add item to server:", errorPayload);
    });
    builder.addCase(addItemToServer.pending, (state, action) => {
      state.addingToCart.state = true;
      state.addingToCart.product = action.meta.arg.product;
      console.log("addItemToServer.pending", action);
    });

    builder.addCase(decreaseItemFromServer.fulfilled, (state, action) => {
      console.log(state, action);

      const existingItem = state.items.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }

      // Show toast notification
      toast(`Product added to cart`, {
        description: `${action.payload.product.name} updated`,
        action: {
          label: "Cart",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });

      state.addingToCart.state = false;
      state.addingToCart.product = null;

      console.log("Item successfully added to server");
    });
    builder.addCase(decreaseItemFromServer.rejected, (state, action) => {
      state.addingToCart.state = false;
      state.addingToCart.product = null;

      const errorPayload = action.payload as {
        message: string;
        status: string;
        statusCode: number;
      };

      const errorMessage =
        errorPayload?.message || "Failed to add item to cart";

      toast(`We cannot add product to cart`, {
        description: errorMessage,
        action: {
          label: "Cart",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });

      console.error("Failed to add item to server:", errorPayload);
    });
    builder.addCase(decreaseItemFromServer.pending, (state, action) => {
      state.addingToCart.state = true;
      state.addingToCart.product = action.meta.arg.product;
      console.log("addItemToServer.pending", action);
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
        state.items.splice(index, 1);

        // state.items[index].quantity =  action.payload.quantity;

        state.deletingProductFromCart = {
          state: false,
          product: null,
        };
        toast(`Product deleted`, {
          description: `Product deleted successfully`,
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
      state.deletingProductFromCart.state = false;
      console.error("Failed to remove item from server:", action.error.message);
    });

    builder.addCase(removeItemFromServer.pending, (state, action) => {
      state.deletingProductFromCart.state = true;
      state.deletingProductFromCart.product = action.meta.arg.id;
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

      state.clearingCart = false;

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
      state.clearingCart = false;
      console.error("Failed to fetch cart from server:", action.error.message);
    });

    builder.addCase(clearCertFromServer.pending, (state, action) => {
      state.clearingCart = true;
    });
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
