import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isRegisterFormOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.isRegisterFormOpen = false;
    },
    openRegisterForm: (state) => {
      state.isRegisterFormOpen = true;
    },
    openLoginForm: (state) => {
      state.isRegisterFormOpen = false;
    },
  },
});

export const { openModal, closeModal, openRegisterForm, openLoginForm } =
  modalSlice.actions;

export default modalSlice.reducer;
