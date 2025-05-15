import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const productToRemove = state.products.find(
        (product) => product._id === action.payload
      );
      state.quantity -= productToRemove.quantity;
      state.total -= productToRemove.price * productToRemove.quantity;
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      const productToUpdate = state.products.find(
        (product) => product._id === id
      );
      
      state.quantity += newQuantity - productToUpdate.quantity;
      state.total += productToUpdate.price * (newQuantity - productToUpdate.quantity);
      productToUpdate.quantity = newQuantity;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;