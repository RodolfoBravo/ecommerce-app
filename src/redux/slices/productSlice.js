import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filterProductList from "../../util/filterProduct";
import searchItemsByText from "../../util/searchItemsByText";
import * as Types from "../constants/actionTypes";

const initialState = {
  items: [],
  filteredList: [],
};

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (payload, thunkAPI) => {
    const { searchTerm, url, filters } = payload;
    try {
      console.log("fetchProduct");
      const sendRequest = await fetch(url);
      const data = await sendRequest.json();
      const searchedItems = searchItemsByText(searchTerm, data);
      const filteredList = filterProductList(searchedItems, filters);
      console.log("fetchProduct", filteredList);
      return filteredList;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMoreProduct = createAsyncThunk(
  "products/fetchMoreProduct",
  async (payload, thunkAPI) => {
    const { url, total } = payload;
    try {
      const sendRequest = await fetch(url);
      const data = await sendRequest.json();
      return { products: data, total };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchedProduct(state, action) {
      console.log("fetchedProduct");
      state.filteredList = [...action.payload.products];
    },
    fetchedMoreProduct(state, action) {
      const mergeAllProducts = [...state.items, ...action.payload.products];
      const limit =
        action.payload.total && mergeAllProducts.length > action.payload.total
          ? mergeAllProducts.splice(0, action.payload.total)
          : mergeAllProducts;
      state.items = [...limit];
    },
    addProduct(state, action) {
      state.items = [...state.items, action.payload];
    },
    deleteProduct(state, action) {
      deleteProduct(state, action.payload.id);
    },
    updateProduct(state, action) {
      const index = findProductIndexById(state, action.payload.product.id);
      state.items[index] = action.payload.product;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        console.log("fetchProduct.fulfilled");
        state.items = [...action.payload];
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        console.log("fetchProduct was rejected", action.error);
      })
      .addCase(fetchMoreProduct.fulfilled, (state, action) => {
        const mergeAllProducts = [...state.items, ...action.payload.products];
        const limit =
          action.payload.total && mergeAllProducts.length > action.payload.total
            ? mergeAllProducts.splice(0, action.payload.total)
            : mergeAllProducts;
        state.items = [...limit];
      });
  },
});

export const {
  fetchedProduct,
  fetchedMoreProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
