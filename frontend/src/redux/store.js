import { configureStore } from "@reduxjs/toolkit";
import photographersReducer from "./slices/photographersSlice";

const store = configureStore({
  reducer: {
    photographers: photographersReducer,
  },
});

export default store;
