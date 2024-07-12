import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  try {
    const response = await axios.get('http://localhost:3001/products/'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error("Error in fetchItems: ", error.message);
    throw error;
  }
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default itemsSlice.reducer;
