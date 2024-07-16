import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  try {
    const response = await axios.get('/api/cart'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error("Error in fetchCart: ", error.message);
    throw error;
  }
});
 
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle', // added status to handle loading states
    error: null
  },
  reducers: {
    loadItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { loadItems, addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
