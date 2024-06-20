import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMediasByIdPhotographerAPI } from "../utils/api";

export const fetchMediasByIdPhotographerThunk = createAsyncThunk(
  "medias/fetchMediasByIdPhotographer",
  async (id) => {
    const data = await fetchMediasByIdPhotographerAPI(id);
    return data;
  }
);
