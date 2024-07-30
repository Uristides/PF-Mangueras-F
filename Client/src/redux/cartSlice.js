import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  try {
    const { data } = await axios.get(`${backendUrl}/user/id/${userId}`); // Replace with your API endpoint
    const { cart } = data;
    return cart;
  } catch (error) {
    console.error("Error in fetchCart: ", error.message);
    throw error;
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { getState }) => {
    try {
      // Fetch product stock
      const { data: productData } = await axios.get(
        `${backendUrl}/products/${productId}`
      );
      const productStock = productData.stock;

      const state = getState();
      const cartItem = state.cart.items.find((item) =>
        item.startsWith(`${productId}:`)
      );
      const currentQuantity = cartItem
        ? parseInt(cartItem.split(":")[1], 10)
        : 0;
      const totalQuantity = currentQuantity + quantity;

      if (totalQuantity > productStock) {
        throw new Error("Cannot add more than available stock.");
      }

      const itemInfo = {
        id: userId,
        item: `${productId}:${totalQuantity}`,
      };

      const { data } = await axios.post(`${backendUrl}/user/addCart`, itemInfo);
      return { productId, quantity }; // Return needed payload
    } catch (error) {
      console.error("Error in addToCart: ", error.message);
      throw error;
    }
  }
);

export const addOneToCart = createAsyncThunk(
  "cart/addOneToCart",
  async ({ userId, productId }, { getState }) => {
    try {
      // Fetch product stock
      const { data: productData } = await axios.get(
        `${backendUrl}/products/${productId}`
      );
      const productStock = productData.stock;

      const state = getState();
      const cartItem = state.cart.items.find((item) =>
        item.startsWith(`${productId}:`)
      );
      const currentQuantity = cartItem
        ? parseInt(cartItem.split(":")[1], 10)
        : 0;
      const totalQuantity = currentQuantity + 1;

      if (totalQuantity > productStock) {
        throw new Error("Cannot add more than available stock.");
      }

      const itemInfo = {
        id: userId,
        item: `${productId}:1`,
      };

      const { data } = await axios.post(`${backendUrl}/user/addCart`, itemInfo);
      return { productId }; // Return needed payload
    } catch (error) {
      console.error("Error in addOneToCart: ", error.message);
      throw error;
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId) => {
    console.log("TO be removed: ", itemId);
    try {
      const { data } = await axios.post(
        `${backendUrl}/user/removeCart`,
        itemId
      );
      return data;
    } catch (error) {
      console.error("Error in removeFromCart: ", error.message);
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    loadItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const cartItemIndex = state.items.findIndex((item) =>
          item.startsWith(`${productId}:`)
        );

        if (cartItemIndex !== -1) {
          const [existingProductId, existingQuantity] = state.items[
            cartItemIndex
          ]
            .split(":")
            .map(Number);
          const newQuantity = existingQuantity + quantity;
          state.items[cartItemIndex] = `${productId}:${newQuantity}`;
        } else {
          state.items.push(`${productId}:${quantity}`);
        }
      })
      .addCase(addOneToCart.fulfilled, (state, action) => {
        const { productId } = action.payload;
        const cartItemIndex = state.items.findIndex((item) =>
          item.startsWith(`${productId}:`)
        );

        if (cartItemIndex !== -1) {
          const [existingProductId, existingQuantity] = state.items[
            cartItemIndex
          ]
            .split(":")
            .map(Number);
          const newQuantity = existingQuantity + 1;
          state.items[cartItemIndex] = `${productId}:${newQuantity}`;
        } else {
          state.items.push(`${productId}:1`);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});

export const { loadItems, addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
