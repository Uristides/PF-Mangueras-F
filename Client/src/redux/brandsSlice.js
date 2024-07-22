import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND;

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/products/brands`);
    return data;
  } catch (error) {
    console.error('Error in fetchBrands:', error.message);
    throw error;
  }
});

const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default brandsSlice.reducer;
