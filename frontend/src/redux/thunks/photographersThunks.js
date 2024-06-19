import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllPhotographersAPI,
  fetchPhotographerByIdAPI,
} from "../utils/api";

export const fetchPhotographers = createAsyncThunk(
  "photographers/fetchPhotographers",
  async () => {
    const data = await fetchAllPhotographersAPI();
    return data;
  }
);

export const fetchPhotographerById = createAsyncThunk(
  "photographers/fetchPhotographerById",
  async (id) => {
    const data = await fetchPhotographerByIdAPI(id);
    return data;
  }
);
