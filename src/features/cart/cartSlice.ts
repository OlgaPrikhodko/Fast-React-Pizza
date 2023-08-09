import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart } from "@/types/orderTypes";

const initialState: { cart: Cart[] } = {
  cart: [
    {
      pizzaId: 12,
      name: "Mediterranean",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Cart>) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item === undefined)
        throw new Error(`Looks like item ${action.payload} is not exists`);

      item.quantity = item.quantity + 1;
      item.totalPrice = item?.quantity * item?.unitPrice;
    },
    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item === undefined)
        throw new Error(`Looks like item ${action.payload} is not exists`);

      item.quantity = item.quantity - 1;
      item.totalPrice = item?.quantity * item?.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
