import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllValidPhotographersAPI,
  fetchPhotographerByIdAPI,
} from "../utils/api";

// Fonction asynchrone pour récupérer les profils valides (Compte où tous les champs ont été renseignés) des photographes.
export const fetchValidPhotographersThunk = createAsyncThunk(
  "photographers/fetchPhotographers",
  async () => {
    const data = await fetchAllValidPhotographersAPI();
    return data;
  }
);

// Fonction asynchrone pour récupérer les données des photographes en fonction de l'ID du photographe.
export const fetchPhotographerByIdThunk = createAsyncThunk(
  "photographers/fetchPhotographerById",
  async (id) => {
    const data = await fetchPhotographerByIdAPI(id);
    return data;
  }
);
