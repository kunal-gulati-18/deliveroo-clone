import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import restaurantSlice from './slices/restaurantSlice';
// import messageReducer from './message';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurants: restaurantSlice
  }
});