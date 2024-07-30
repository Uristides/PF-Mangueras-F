import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;



export const fetchProductReviews = createAsyncThunk("reviews/fetchProductReviews", async (id) => {
  try {
    const { data } = await axios.get(`${backendUrl}/products/reviews/id/${id}`);
    return data;
  } catch (error) {
    console.error("Error in fetchTypes:", error.message);
    throw error;
  }
});

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewsSlice.reducer;
