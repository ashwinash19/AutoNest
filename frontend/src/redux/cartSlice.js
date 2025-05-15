import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existing = state.products.find(p => p._id === action.payload._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.quantity += 1;
      state.total += action.payload.price;
    },
    removeProduct: (state, action) => {
      const product = state.products.find(p => p._id === action.payload);
      state.products = state.products.filter(p => p._id !== action.payload);
      state.quantity -= product.quantity;
      state.total -= product.price * product.quantity;
    },
    updateQuantity: (state, action) => {
      const product = state.products.find(p => p._id === action.payload.id);
      state.total += (action.payload.newQuantity - product.quantity) * product.price;
      state.quantity += action.payload.newQuantity - product.quantity;
      product.quantity = action.payload.newQuantity;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    }
  }
});

export const { addProduct, removeProduct, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;