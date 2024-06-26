import { configureStore } from "@reduxjs/toolkit";
import photographersReducer from "./slices/photographersSlice";
import mediasReducer from "./slices/mediasSlice";
import usersReducer from "./slices/usersSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    photographers: photographersReducer,
    medias: mediasReducer,
    users: usersReducer,
    modal: modalReducer,
  },
  devTools: true,
});

export default store;
