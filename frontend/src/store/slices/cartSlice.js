import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../../services/cartService";

const applyCartPayload = (state, payload) => {
  state.items = payload.items || [];
  state.subtotal = payload.subtotal || 0;
  state.count = state.items.reduce((sum, item) => sum + item.quantity, 0);
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    return await cartService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load cart.");
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await cartService.addToCart(productId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Add to cart failed.");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await cartService.updateCartItem(productId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Cart update failed.");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      return await cartService.removeCartItem(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Could not remove item.");
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  try {
    return await cartService.clearCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Could not clear cart.");
  }
});

const initialState = {
  items: [],
  subtotal: 0,
  count: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        applyCartPayload(state, action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        applyCartPayload(state, action.payload);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        applyCartPayload(state, action.payload);
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        applyCartPayload(state, action.payload);
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        applyCartPayload(state, action.payload || { items: [], subtotal: 0 });
      });
  },
});

export const { resetCartState } = cartSlice.actions;
export const updateCartQty = updateCartItem;
export const removeItemFromCart = removeCartItem;
export default cartSlice.reducer;
