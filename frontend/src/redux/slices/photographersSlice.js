import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPhotographers,
  fetchPhotographerById,
} from "../thunks/photographersThunks";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const handlePhotographersFulfilled = (state, action) => {
  state.loading = false;
  state.photographers = action.payload;
};

const handlePhotographerByIdFulfilled = (state, action) => {
  state.loading = false;
  state.photographers[action.payload._id] = action.payload;
};

const photographersSlice = createSlice({
  name: "photographers",
  initialState: {
    photographers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotographers.pending, handlePending)
      .addCase(fetchPhotographers.fulfilled, handlePhotographersFulfilled)
      .addCase(fetchPhotographers.rejected, handleRejected)
      .addCase(fetchPhotographerById.pending, handlePending)
      .addCase(fetchPhotographerById.fulfilled, handlePhotographerByIdFulfilled)
      .addCase(fetchPhotographerById.rejected, handleRejected);
  },
});
export default photographersSlice.reducer;
