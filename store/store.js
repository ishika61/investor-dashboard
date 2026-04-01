import { configureStore } from "@reduxjs/toolkit";
import dealReducer from "./dealSlice";

export const store = configureStore({
  reducer: {
    deals: dealReducer,
  },
});