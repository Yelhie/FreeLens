import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllValidPhotographersAPI,
  fetchPhotographerByIdAPI,
} from "../utils/api";

export const fetchPhotographersThunk = createAsyncThunk(
  "photographers/fetchPhotographers",
  async () => {
    const data = await fetchAllValidPhotographersAPI();
    return data;
  }
);

export const fetchPhotographerByIdThunk = createAsyncThunk(
  "photographers/fetchPhotographerById",
  async (id) => {
    const data = await fetchPhotographerByIdAPI(id);
    return data;
  }
);
