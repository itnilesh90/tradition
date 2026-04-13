import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getActivePromoVideos } from "../../services/promoService";

export const fetchPromoVideos = createAsyncThunk(
  "promo/fetchPromoVideos",
  async (_, thunkAPI) => {
    try {
      return await getActivePromoVideos();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Unable to load promos");
    }
  }
);

const promoSlice = createSlice({
  name: "promo",
  initialState: {
    promoVideos: [],
    activeVideo: null,
    brandStoryVideo: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromoVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.promoVideos = action.payload || [];
        state.activeVideo =
          state.promoVideos.find((video) => video.section === "hero" && video.isActive) ||
          state.promoVideos[0] ||
          null;
        state.brandStoryVideo =
          state.promoVideos.find((video) => video.section === "brand-story" && video.isActive) ||
          null;
      })
      .addCase(fetchPromoVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default promoSlice.reducer;
