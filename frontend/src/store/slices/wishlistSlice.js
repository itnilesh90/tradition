import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWishlist as addToWishlistApi,
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";

export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async (_, thunkAPI) => {
  try {
    const data = await getWishlist();
    return data.wishlist ?? [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load wishlist");
  }
});

export const addWishlistItem = createAsyncThunk("wishlist/addItem", async (productId, thunkAPI) => {
  try {
    const data = await addToWishlistApi(productId);
    return data.wishlist ?? [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add wishlist item");
  }
});

export const removeWishlistItem = createAsyncThunk("wishlist/removeItem", async (productId, thunkAPI) => {
  try {
    const data = await removeFromWishlist(productId);
    return data.wishlist ?? [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to remove wishlist item");
  }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const toggleWishlistItem = createAsyncThunk(
  "wishlist/toggleItem",
  async (productId, thunkAPI) => {
    const state = thunkAPI.getState();
    const exists = state.wishlist.items.some((item) => item._id === productId);
    if (exists) {
      return thunkAPI.dispatch(removeWishlistItem(productId)).unwrap();
    }
    return thunkAPI.dispatch(addWishlistItem(productId)).unwrap();
  }
);

export const addToWishlist = addWishlistItem;
export default wishlistSlice.reducer;
