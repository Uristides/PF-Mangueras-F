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

export const getBrands = createAsyncThunk('items/getBrands', async () => {
  try {
    const response = await axios.get('http://localhost:3001/products/brands');
    return response.data;
  } catch (error) {
    console.error('Error in getBrands: ', error.message);
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

export const filterByBrand = createAction('items/filterByBrand', (brand) => ({
  payload: brand,
}));

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    originalItems: [],
    brands: [],
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
        state.originalItems = action.payload;
        applyFilters(state);
        applySort(state, localStorage.getItem('selectedSort'));
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
        state.originalItems = action.payload;

        // Aplica los filtros almacenados
        applyFilters(state);
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
      .addCase(filterByType, (state, action) => {
        localStorage.setItem('typeValue', action.payload);
        applyFilters(state);
      })
      .addCase(filterItemsByPrice, (state, action) => {
        localStorage.setItem('priceValue', action.payload);
        applyFilters(state);
      })
      .addCase(filterByBrand, (state, action) => {
        localStorage.setItem('brandValue', action.payload);
        applyFilters(state);
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      });
  },
});

const applyFilters = (state) => {
  let filteredItems = state.originalItems;

  const priceValue = localStorage.getItem('priceValue');
  const typeValue = localStorage.getItem('typeValue');
  const brandValue = localStorage.getItem('brandValue');
  const searchTerm = localStorage.getItem('searchTerm');

  if (priceValue) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.price <= priceValue ||
        item.price.toString().includes(priceValue.toString())
    );
  }

  if (typeValue) {
    filteredItems = filteredItems.filter((item) => item.type === typeValue);
  }

  if (brandValue) {
    filteredItems = filteredItems.filter((item) => item.brand === brandValue);
  }

  if (searchTerm) {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  state.items = filteredItems;
};

const applySort = (state, sortType) => {
  if (sortType === 'price_asc') {
    state.items.sort((a, b) => a.price - b.price);
  } else if (sortType === 'price_desc') {
    state.items.sort((a, b) => b.price - a.price);
  } else if (sortType === 'name_asc') {
    state.items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortType === 'name_desc') {
    state.items.sort((a, b) => b.name.localeCompare(a.name));
  }
};

export default itemsSlice.reducer;
