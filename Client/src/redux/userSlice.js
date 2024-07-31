import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND;

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/user/`); // Replace with your API endpoint
    return data;
  } catch (error) {
    console.log("error in fetchUser: ", error.message);
  }
});

export const editUser = createAsyncThunk("user/editUser", async (updatedUser)=>{
  try {
    const { data } = await axios.post(`${backendUrl}/user/editUser`, updatedUser)
            if(data) {
                alert ("Usuario actualizado exitosamente!")
            }
  } catch (error) {
    return alert("Error in edit user: ", error.message)
  }
})

const userSlice = createSlice({
  name: "user",
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
      })
      .addCase(editUser.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message
      })
      .addCase(editUser.pending, (state)=>{
        state.loading = true;
        state.error = null
      })
      .addCase(editUser.fulfilled, (state, action)=>{
        state.loading = false;
        state.items = { ...state.items, ...action.payload };
        window.location.reload();
      })
      ;
  },
});

export default userSlice.reducer;
