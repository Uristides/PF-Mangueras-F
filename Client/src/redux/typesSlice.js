import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;



export const fetchTypes = createAsyncThunk("types/fetchTypes", async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/products/types`);
    return data;
  } catch (error) {
    console.error("Error in fetchTypes:", error.message);
    throw error;
  }
});

const typesSlice = createSlice({
  name: "types",
  initialState: {
    types: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default typesSlice.reducer;
