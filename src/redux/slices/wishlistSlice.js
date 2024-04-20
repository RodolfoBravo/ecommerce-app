import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: false,
  items: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    openWishlistModal(state, action) {
      state.modal = true;
    },
    closeWishlistModal(state, action) {
      state.modal = false;
    },
    addToWishlist(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.product.id);
      if (index === -1) {
        state.items.push(action.payload.product);
        // Aquí puedes almacenar en el local storage si lo necesitas
      }
    },
    deleteFromWishlist(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.productId);
      if (index !== -1) {
        state.items.splice(index, 1);
        // Aquí puedes actualizar el local storage si lo necesitas
      }
    },
    clearWishlist(state, action) {
      state.items = [];
      // Aquí puedes limpiar el local storage si lo necesitas
    },
  },
});

export const { openWishlistModal, closeWishlistModal, addToWishlist, deleteFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;