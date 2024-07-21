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

export const editItem = createAsyncThunk("products/editItem", async (oldProduct) => {
  const editedItem = {
    id: oldProduct.id,
    name: oldProduct.name,
    image: oldProduct.image,
    price: oldProduct.price.toString(),
    diameter: oldProduct.diameter.toString(),
    longitude: oldProduct.longitude.toString(),
    description: oldProduct.description,
    stock: oldProduct.stock,
    available: oldProduct.available,
    show: oldProduct.show,
    brand: oldProduct.brand,
    type: oldProduct.type,
  };
  try {
    const { data } = await axios.post(`${backendUrl}/products/edit/`, editedItem);
    if(data) alert("Producto editado exitosamente!")
    return data;
  } catch (error) {
    console.error("Error in editItem: ", error.message);
    throw error;
  }
});

export const productCreate = createAsyncThunk("products/productCreate", async (newProduct) => {
  const newItem = {
    name: newProduct.name,
    image: newProduct.image,
    price: newProduct.price.toString(),
    diameter: newProduct.diameter.toString(),
    longitude: newProduct.longitude.toString(),
    description: newProduct.description,
    stock: newProduct.stock,
    available: newProduct.available,
    show: newProduct.show,
    brand: newProduct.brand,
    type: newProduct.type,
  };
  try {
    const { data } = await axios.post(`${backendUrl}/products/`, newItem);
    return data;
  } catch (error) {
    console.error("Error in productCreate: ", error.message);
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
      })
      .addCase(productCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add the newly created item to the items array
        state.allItems.push(action.payload);
        state.items.push(action.payload);
      })
      .addCase(productCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the edited item in the items array
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.allItems[index] = action.payload;
        }
      })
      .addCase(editItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
