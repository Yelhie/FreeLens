import { createSlice } from "@reduxjs/toolkit";
import {
  fetchValidPhotographersThunk,
  fetchPhotographerByIdThunk,
} from "../thunks/photographersThunks";

// Fonction pour gérer l'état de la récupération des données depuis l'API.
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

// Fonction pour gérer l'état des erreurs lors de la récupération des données depuis l'API.
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

// Fonction pour gérer l'état des photographes aux comptes valids récupérés avec succès depuis l'API.
const handleValidPhotographersFulfilled = (state, action) => {
  state.loading = false;
  state.photographers = action.payload;
};

// Fonction pour gérer l'état du photographe récupéré via son ID avec succès depuis l'API.
const handlePhotographerByIdFulfilled = (state, action) => {
  state.loading = false;
  state.photographers[action.payload._id] = action.payload;
};

// Slice pour les photographes
const photographersSlice = createSlice({
  // Création du slice avec son nom et son état initial
  name: "photographers",
  initialState: {
    photographers: [], // Tableau des photographes
    loading: false, // Gestion du chargement
    error: null, // Gestion des erreurs
  },
  reducers: {},
  extraReducers: (builder) => {
    // Définition des actions supplémentaires pour les actions asynchrones et utilise le builder pour ajouter des gestionnaires pour chaque état des thunks
    builder
      .addCase(fetchValidPhotographersThunk.pending, handlePending)
      .addCase(
        fetchValidPhotographersThunk.fulfilled,
        handleValidPhotographersFulfilled
      )
      .addCase(fetchValidPhotographersThunk.rejected, handleRejected)
      .addCase(fetchPhotographerByIdThunk.pending, handlePending)
      .addCase(
        fetchPhotographerByIdThunk.fulfilled,
        handlePhotographerByIdFulfilled
      )
      .addCase(fetchPhotographerByIdThunk.rejected, handleRejected);
  },
});
export default photographersSlice.reducer;
