import { createSlice } from "@reduxjs/toolkit";
import { fetchMediasByIdPhotographerThunk } from "../thunks/mediasThunks";

// Fonction pour gérer l'état "pending" de la requête.
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

// Fonction pour gérer l'état "rejected" de la requête.
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

// Fonction pour gérer l'état "fulfilled" de la requête.
const handleMediasFulfilled = (state, action) => {
  state.loading = false;
  state.medias = action.payload;
};

const mediasSlice = createSlice({
  name: "medias",
  initialState: {
    medias: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediasByIdPhotographerThunk.pending, handlePending)
      .addCase(
        fetchMediasByIdPhotographerThunk.fulfilled,
        handleMediasFulfilled
      )
      .addCase(fetchMediasByIdPhotographerThunk.rejected, handleRejected);
  },
});

export default mediasSlice.reducer;
