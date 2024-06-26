import { createSlice } from "@reduxjs/toolkit";
import { registerUserThunk } from "../thunks/usersThunks";

// Slice pour les utilisateurs
const usersSlice = createSlice({
  // Création du slice avec son nom et son état initial
  name: "users",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Définition des actions supplémentaires pour les actions asynchrones et utilise le builder pour ajouter des gestionnaires pour chaque état des thunks
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
