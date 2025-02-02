import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  try {
    const response = await axios.get(`${backendUrl}/products/`);
    // console.log("fetchItems function: ", response.data)
    return response.data;
  } catch (error) {
    console.error("Error in fetchItems: ", error.message);
    throw error;
  }
});

export const editItem = createAsyncThunk(
  "products/editItem",
  async (oldProduct) => {
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
      const { data } = await axios.post(
        `${backendUrl}/products/edit/`,
        editedItem
      );
      if (data) alert("Producto editado exitosamente!");
      return data;
    } catch (error) {
      console.error("Error in editItem: ", error.message);
      throw error;
    }
  }
);

export const productCreate = createAsyncThunk(
  "products/productCreate",
  async (newProduct) => {
    function stringToBoolean(str) {
      return str.toLowerCase() === "true";
    }

    const newItem = {
      name: newProduct.name,
      image: newProduct.image,
      price: newProduct.price.toString(),
      diameter: newProduct.diameter.toString(),
      longitude: newProduct.longitude.toString(),
      brand: newProduct.brand,
      type: newProduct.type,
      description: newProduct.description,
      stock: Number(newProduct.stock),
      available: stringToBoolean(newProduct.available),
      show: stringToBoolean(newProduct.show),
    };

    try {
      const { data } = await axios.post(`${backendUrl}/products/`, newItem);
      return data;
    } catch (error) {
      console.error("Error in productCreate: ", error.message);
      throw error;
    }
  }
);

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

export const filterItemsByPriceRange = createAction(
  "items/filterByPriceRange",
  (range) => ({ payload: range })
);

export const filterByType = createAction("items/filterByType", (type) => ({
  payload: type,
}));

export const filterByBrand = createAction("items/filterByBrand", (brand) => ({
  payload: brand,
}));

export const resetFilters = createAction("items/resetFilters");

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    originalItems: [],
    brands: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.originalItems = action.payload;
        applyFilters(state);
        applySort(state, localStorage.getItem("selectedSort"));
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
        state.items = action.payload;
        state.originalItems = action.payload;
        applyFilters(state); // Aplica los filtros almacenados
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
      .addCase(filterByType, (state, action) => {
        localStorage.setItem("typeValue", action.payload);
        applyFilters(state);
      })
      .addCase(filterItemsByPriceRange, (state, action) => {
        localStorage.setItem("minPrice", action.payload.minPrice);
        localStorage.setItem("maxPrice", action.payload.maxPrice);
        applyFilters(state);
      })
      .addCase(filterByBrand, (state, action) => {
        localStorage.setItem("brandValue", action.payload);
        applyFilters(state);
      })
      .addCase(productCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add the newly created item to the items array
        // state.allItems.push(action.payload);
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
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          state.allItems[index] = action.payload;
        }
      })
      .addCase(editItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(resetFilters, (state) => {
        localStorage.removeItem("minPrice");
        localStorage.removeItem("maxPrice");
        localStorage.removeItem("typeValue");
        localStorage.removeItem("brandValue");
        localStorage.removeItem("selectedSort");
        state.items = state.originalItems;
      });
  },
});

const applyFilters = (state) => {
  let filteredItems = state.originalItems;

  const minPrice = localStorage.getItem("minPrice");
  const maxPrice = localStorage.getItem("maxPrice");
  const typeValue = localStorage.getItem("typeValue");
  const brandValue = localStorage.getItem("brandValue");
  const searchTerm = localStorage.getItem("searchTerm");

  if (minPrice || maxPrice) {
    filteredItems = filteredItems.filter((item) => {
      const itemPrice = parseFloat(item.price);
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;
      return itemPrice >= min && itemPrice <= max;
    });
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
  if (sortType === "price_asc") {
    state.items.sort((a, b) => a.price - b.price);
  } else if (sortType === "price_desc") {
    state.items.sort((a, b) => b.price - a.price);
  } else if (sortType === "name_asc") {
    state.items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortType === "name_desc") {
    state.items.sort((a, b) => b.name.localeCompare(a.name));
  }
};

export default itemsSlice.reducer;