import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder as createOrderApi,
  fetchAllOrders,
  fetchMyOrders as fetchMyOrdersApi,
  updateOrderStatus as updateOrderStatusApi,
} from "../../services/orderService";

const initialState = {
  lastOrder: null,
  myOrders: [],
  adminOrders: [],
  loading: false,
  error: null,
};

export const createOrderThunk = createAsyncThunk(
  "orders/create",
  async (payload, thunkAPI) => {
    try {
      const { data } = await createOrderApi(payload);
      return data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Checkout failed"
      );
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchMyOrdersApi();
      return data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch your orders"
      );
    }
  }
);

export const fetchAdminOrders = createAsyncThunk(
  "orders/fetchAdminOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchAllOrders();
      return data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch orders"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, payload }, thunkAPI) => {
    try {
      const { data } = await updateOrderStatusApi(orderId, payload);
      return data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to update order"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearLastOrder: (state) => {
      state.lastOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lastOrder = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = state.adminOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLastOrder } = orderSlice.actions;
export const createOrder = createOrderThunk;
export default orderSlice.reducer;
