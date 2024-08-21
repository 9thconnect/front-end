import { Product } from "@/type/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface CartState {
  items: { product: Product; quantity: number }[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
