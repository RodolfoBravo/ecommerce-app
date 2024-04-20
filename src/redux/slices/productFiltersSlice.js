import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  rating: null,
  // Añade aquí cualquier otro estado que tengas en tu reducer
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateProductFilters(state, action) {
      state = { ...state, ...action.payload.productFilters };
    },
    updateProductCategory(state, action) {
      state.category = action.payload.category;
    },
    updateProductRating(state, action) {
      state.rating = action.payload.rating;
    },
  },
});

export const { updateProductFilters, updateProductCategory, updateProductRating } = filtersSlice.actions;

export default filtersSlice.reducer;