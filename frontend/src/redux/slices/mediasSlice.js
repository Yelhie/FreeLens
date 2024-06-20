import { createSlice } from "@reduxjs/toolkit";
import { fetchMediasByIdPhotographerThunk } from "../thunks/mediasThunks";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

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
