import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPhotographersThunk,
  fetchPhotographerByIdThunk,
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
      .addCase(fetchPhotographersThunk.pending, handlePending)
      .addCase(fetchPhotographersThunk.fulfilled, handlePhotographersFulfilled)
      .addCase(fetchPhotographersThunk.rejected, handleRejected)
      .addCase(fetchPhotographerByIdThunk.pending, handlePending)
      .addCase(
        fetchPhotographerByIdThunk.fulfilled,
        handlePhotographerByIdFulfilled
      )
      .addCase(fetchPhotographerByIdThunk.rejected, handleRejected);
  },
});
export default photographersSlice.reducer;
