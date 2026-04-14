import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMe,
  loginUser as loginUserApi,
  registerUser as registerUserApi,
  updateMe,
} from "../../services/authService";

const token = localStorage.getItem("token");
const userRaw = localStorage.getItem("user");

const initialState = {
  token: token || null,
  user: userRaw ? JSON.parse(userRaw) : null,
  loading: false,
  initialized: Boolean(userRaw) || !token,
  error: null,
};

export const registerThunk = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await registerUserApi(payload);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

export const loginThunk = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await loginUserApi(payload);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const loadProfileThunk = createAsyncThunk("auth/profile", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getMe();
    return data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to load profile");
  }
});

export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await updateMe(payload);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Profile update failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.initialized = true;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initialized = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loadProfileThunk.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.initialized = true;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export const registerUser = registerThunk;
export const loginUser = loginThunk;
export default authSlice.reducer;
