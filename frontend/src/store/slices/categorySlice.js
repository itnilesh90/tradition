import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCategory as createCategoryApi,
  deleteCategory as deleteCategoryApi,
  fetchCategories as fetchCategoriesApi,
  updateCategory as updateCategoryApi,
} from "../../services/categoryService";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategoriesThunk = createAsyncThunk(
  "categories/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await fetchCategoriesApi();
      return data.categories;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load categories");
    }
  }
);

export const createCategoryThunk = createAsyncThunk(
  "categories/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await createCategoryApi(payload);
      return data.category;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create category");
    }
  }
);

export const updateCategoryThunk = createAsyncThunk(
  "categories/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await updateCategoryApi(id, payload);
      return data.category;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update category");
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCategoryApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete category");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export const fetchCategories = fetchCategoriesThunk;
export default categorySlice.reducer;
