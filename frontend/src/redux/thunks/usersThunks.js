import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRegisterUserAPI } from "../utils/api";

export const registerUserThunk = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetchRegisterUserAPI(userData);
      return response;
    } catch (error) {
      // console.error("Erreur dans le thunk:", error.message);
      return rejectWithValue(error.message);
    }
  }
);
