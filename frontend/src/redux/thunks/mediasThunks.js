import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMediasByIdPhotographerAPI } from "../utils/api";

// Fonction asynchrone pour récupérer les médias en fonction de l'ID du photographe.
export const fetchMediasByIdPhotographerThunk = createAsyncThunk(
  "medias/fetchMediasByIdPhotographer",
  async (id) => {
    const data = await fetchMediasByIdPhotographerAPI(id);
    return data;
  }
);
