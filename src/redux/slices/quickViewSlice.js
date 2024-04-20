import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const quickViewSlice = createSlice({
  name: 'quickView',
  initialState,
  reducers: {
    openQuickView(state, action) {
      return action.payload.product;
    },
    closeQuickView(state, action) {
      return null;
    },
  },
});

export const { openQuickView, closeQuickView } = quickViewSlice.actions;

export default quickViewSlice.reducer;