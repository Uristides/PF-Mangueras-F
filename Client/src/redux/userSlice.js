import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND;

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/user/`);
    return data;
  } catch (error) {
    console.log('error in fetchUser: ', error.message);
  }
});

export const editUser = createAsyncThunk(
  'user/editUser',
  async (updatedUser) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/user/editUser`,
        updatedUser
      );
      if (data) {
        alert('Usuario actualizado exitosamente!');
      }
    } catch (error) {
      return alert('Error in edit user: ', error.message);
    }
  }
);
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId) => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/id/${userId}`);
      return data;
    } catch (error) {
      console.log('error in fetchUserById: ', error.message);
    }
  }
);

export const fetchUserReviews = createAsyncThunk(
  'user/fetchUserReviews',
  async (userId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/user/myReviews/${userId}`
      );
      return data;
    } catch (error) {
      console.log('error in fetchUserReviews: ', error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    items: {},
    item: {},
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload.usuario;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
