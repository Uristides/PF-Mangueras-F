import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  try {
    const response = await axios.get('http://localhost:3001/products/');
    return response.data;
  } catch (error) {
    console.error('Error in fetchItems: ', error.message);
    throw error;
  }
});

export const searchItems = createAsyncThunk(
  'items/searchItems',
  async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/products/search?name=${query}`
      );
      return response.data;
    } catch (error) {
      console.error('Error in searchItems: ', error.message);
      throw error;
    }
  }
);

export const sortItemsByNameAscending = createAction(
  'items/sortByNameAscending'
);
export const sortItemsByNameDescending = createAction(
  'items/sortByNameDescending'
);
export const sortItemsByPriceAscending = createAction(
  'items/sortByPriceAscending'
);
export const sortItemsByPriceDescending = createAction(
  'items/sortByPriceDescending'
);

export const filterItemsByPrice = createAction(
  'items/filterByPrice',
  (price) => ({ payload: price })
);

export const filterByType = createAction('items/filterByType', (type) => ({
  payload: type,
}));

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
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
      })
      .addCase(searchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sortItemsByNameAscending, (state) => {
        state.items.sort((a, b) => a.name.localeCompare(b.name));
      })
      .addCase(sortItemsByNameDescending, (state) => {
        state.items.sort((a, b) => b.name.localeCompare(a.name));
      })
      .addCase(sortItemsByPriceAscending, (state) => {
        state.items.sort((a, b) => a.price - b.price);
      })
      .addCase(sortItemsByPriceDescending, (state) => {
        state.items.sort((a, b) => b.price - a.price);
      })
      .addCase(filterItemsByPrice, (state, action) => {
        const price = action.payload;
        state.items = state.items.filter((item) => item.price >= price);
      })
      .addCase(filterByType, (state, action) => {
        const type = action.payload;
        state.items = state.items.filter((item) => item.type === type);
      });
  },
});

export default itemsSlice.reducer;
