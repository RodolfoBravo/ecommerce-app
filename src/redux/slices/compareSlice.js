import { createSlice } from '@reduxjs/toolkit';

const compareSlice = createSlice({
  name: 'compare',
  initialState: {
    modal: false,
    items: []
  },
  reducers: {
    openCompareModal(state) {
      state.modal = true;
    },
    closeCompareModal(state) {
      state.modal = false;
    },
    addToCompare(state, action) {
      state.items.push(action.payload.product);
    },
    deleteFromCompare(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.productId);
    },
    clearCompare(state) {
      state.items = [];
    }
  }
});

export const { openCompareModal, closeCompareModal, addToCompare, deleteFromCompare, clearCompare } = compareSlice.actions;

export default compareSlice.reducer;