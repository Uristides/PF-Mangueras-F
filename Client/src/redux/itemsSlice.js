import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  try {
    const response = await axios.get(`${backendUrl}/products/`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchItems: ", error.message);
    throw error;
  }
});

export const searchItems = createAsyncThunk(
  "items/searchItems",
  async (query) => {
    try {
      const response = await axios.get(
        `${backendUrl}/products/search?name=${query}`
      );
      return response.data;
    } catch (error) {
      console.error("Error in searchItems: ", error.message);
      throw error;
    }
  }
);

export const sortItemsByNameAscending = createAction(
  "items/sortByNameAscending"
);
export const sortItemsByNameDescending = createAction(
  "items/sortByNameDescending"
);
export const sortItemsByPriceAscending = createAction(
  "items/sortByPriceAscending"
);
export const sortItemsByPriceDescending = createAction(
  "items/sortByPriceDescending"
);

export const filterItemsByPrice = createAction(
  "items/filterByPrice",
  (price) => ({ payload: price })
);

export const filterByType = createAction("items/filterByType", (type) => ({
  payload: type,
}));

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    allItems: [],
    items: [],
    status: "idle",
    error: null,
    filter: {
      type: "",
      price: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allItems = action.payload;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allItems = action.payload;
        state.items = action.payload;
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.status = "failed";
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
        state.filter.price = action.payload;
        applyFilters(state);
      })
      .addCase(filterByType, (state, action) => {
        state.filter.type = action.payload;
        applyFilters(state);
      });
  },
});

const applyFilters = (state) => {
  let filteredItems = state.allItems;

  if (state.filter.type) {
    filteredItems = filteredItems.filter(
      (item) => item.type === state.filter.type
    );
  }

  if (state.filter.price !== null) {
    filteredItems = filteredItems.filter(
      (item) => item.price <= state.filter.price
    );
  }

  state.items = filteredItems;
};

export default itemsSlice.reducer;
