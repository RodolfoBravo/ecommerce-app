import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const { product } = action.payload;
      const index = state.findIndex(item => item.id === product.id);
      if (index !== -1) {
        state[index].quantity += 1;
      } else {
        product.quantity = 1;
        state.push(product);
      }
    },
    deleteFromCart(state, action) {
      const { productId } = action.payload;
      return state.filter(item => item.id !== productId);
    },
    increaseQuantity(state, action) {
      const { productId } = action.payload;
      const index = state.findIndex(item => item.id === productId);
      if (index !== -1) {
        state[index].quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const { productId } = action.payload;
      const index = state.findIndex(item => item.id === productId);
      if (index !== -1 && state[index].quantity > 1) {
        state[index].quantity -= 1;
      }
    },
    clearCart(state) {
      return [];
    }
  }
});

export const { addToCart, deleteFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
