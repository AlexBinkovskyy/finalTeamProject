import { createSlice } from '@reduxjs/toolkit';
import {
  addConsumption,
  deleteConsumption,
  fetchDailyConsumption,
  fetchMonthlyConsumption,
  updateConsumption,
} from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    dayNotes: [],
    monthNotes: [],
    loading: false,
    error: null,
  },

  extraReducers: builder =>
    builder
      .addCase(fetchDailyConsumption.pending, handlePending)
      .addCase(fetchDailyConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayNotes = action.payload.dailyCount;
        console.log(state.dayNotes);
      })
      .addCase(fetchDailyConsumption.rejected, handleRejected)

      .addCase(fetchMonthlyConsumption.pending, handlePending)
      .addCase(fetchMonthlyConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.monthNotes = action.payload;
      })
      .addCase(fetchMonthlyConsumption.rejected, handleRejected)

      .addCase(addConsumption.pending, handlePending)
      .addCase(addConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayNotes = action.payload.dailyCount;
      })
      .addCase(addConsumption.rejected, handleRejected)

      .addCase(deleteConsumption.pending, handlePending)
      .addCase(deleteConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayNotes = action.payload.dailyCount;
      })
      .addCase(deleteConsumption.rejected, handleRejected)

      .addCase(updateConsumption.pending, handlePending)
      .addCase(updateConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayNotes = action.payload.dailyCount;
      })
      .addCase(updateConsumption.rejected, handleRejected),
});

export const waterReducer = waterSlice.reducer;
