import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchHomeCollections as fetchHomeCollectionsApi,
  fetchProductById as fetchProductByIdApi,
  fetchProducts as fetchProductsApi,
} from "../../services/productService";

const initialState = {
  items: [],
  pagination: { page: 1, limit: 12, total: 0, totalPages: 1 },
  homeCollections: {
    newArrivals: [],
    ethnicCollection: [],
    accessories: [],
    handmade: [],
  },
  selectedProduct: null,
  loading: false,
  loadingCollections: false,
  loadingProduct: false,
  error: null,
};

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await fetchProductsApi(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Unable to load products");
    }
  }
);

export const fetchHomeCollectionsThunk = createAsyncThunk(
  "products/fetchHomeCollections",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await fetchHomeCollectionsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Unable to load homepage collections");
    }
  }
);

export const fetchProductByIdThunk = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await fetchProductByIdApi(id);
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Unable to load product");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products || [];
        state.pagination = action.payload.pagination || initialState.pagination;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchHomeCollectionsThunk.pending, (state) => {
        state.loadingCollections = true;
        state.error = null;
      })
      .addCase(fetchHomeCollectionsThunk.fulfilled, (state, action) => {
        state.loadingCollections = false;
        state.homeCollections = {
          newArrivals: action.payload.newArrivals || [],
          ethnicCollection: action.payload.ethnicCollection || [],
          accessories: action.payload.accessories || [],
          handmade: action.payload.handmade || [],
        };
      })
      .addCase(fetchHomeCollectionsThunk.rejected, (state, action) => {
        state.loadingCollections = false;
        state.error = action.payload;
      })
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loadingProduct = true;
        state.error = null;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const fetchProducts = fetchProductsThunk;
export const fetchHomeCollections = fetchHomeCollectionsThunk;
export const fetchProductById = fetchProductByIdThunk;
export default productSlice.reducer;
