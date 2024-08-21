import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import layoutSlice from "./features/layout/layoutSlice";
import authSlice from "./features/auth/authSlice";
// Import other reducers if you have any

// Combine the reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  layout: layoutSlice,
  auth: authSlice,
  // Add other reducers here
});

export default rootReducer;
