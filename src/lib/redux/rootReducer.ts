import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import layoutSlice from "./features/layoutSlice/layoutSlice";
// Import other reducers if you have any

// Combine the reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  layout: layoutSlice,
  // Add other reducers here
});

export default rootReducer;
