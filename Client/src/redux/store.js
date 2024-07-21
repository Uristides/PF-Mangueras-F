import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import itemsReducer from './itemsSlice';
import typesReducer from './typesSlice'
import brandsReducer from './brandsSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    items: itemsReducer,
    types: typesReducer,
    brands: brandsReducer,
    
  },
});

export default store;
