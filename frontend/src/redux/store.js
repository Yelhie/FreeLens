import { configureStore } from "@reduxjs/toolkit";
import photographersReducer from "./slices/photographersSlice";
import mediasReducer from "./slices/mediasSlice";

const store = configureStore({
  reducer: {
    photographers: photographersReducer,
    medias: mediasReducer,
  },
});

export default store;
