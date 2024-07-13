import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {

  try {
    const response = await axios.get('/api/user'); // Replace with your API endpoint
    return response.data;
    
  } catch (error) {
    console.log("error in fetchUser: ", error.message)
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    items: {},
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
      });
  },
});

export default userSlice.reducer;
