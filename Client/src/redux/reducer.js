import { createSlice } from "@reduxjs/toolkit";

const ecomerceReducer = createSlice({
    name:"products",
    initialState:{Products:[]},
        reducers:{
            getProducts:(state,action)=>{
                state.Products = action.payload;
            },
        }
})

export default ecomerceReducer.reducer;
export const{getProducts ,} =ecomerceReducer.actions;