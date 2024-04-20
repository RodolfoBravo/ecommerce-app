import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import filterProductList from '../../util/filterProduct';
import searchItemsByText from '../../util/searchItemsByText';

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async ({ searchTerm, url, filters }) => {
    const sendRequest = await fetch(url);
    const data = await sendRequest.json();
    window.products = data;
    const searchedItems = searchItemsByText(searchTerm, data);
    const filteredList = filterProductList(searchedItems, filters);
    return filteredList;
  }
);

export const fetchMoreProduct = createAsyncThunk(
  'product/fetchMoreProduct',
  async (url, total) => {
    const sendRequest = await fetch(url);
    const data = await sendRequest.json();
    return { products: data, total };
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: { items: [] },
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    deleteProduct(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      state.items.splice(index, 1);
    },
    updateProduct(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.product.id);
      state.items[index] = action.payload.product;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchMoreProduct.fulfilled, (state, action) => {
        const mergeAllProducts = [...state.items, ...action.payload.products];
        const limit = action.payload.total && mergeAllProducts.length > action.payload.total
          ? mergeAllProducts.splice(0, action.payload.total)
          : mergeAllProducts;
        state.items = limit;
      });
  },
});

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions;

export default productSlice.reducer;