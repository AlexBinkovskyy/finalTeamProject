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
    chosenDate: null,
    todayTotal: null,
    dayNotes: [],
    monthNotes: [],
    loading: false,
    error: null,
  },

  extraReducers: builder =>
    builder
      // fetchDailyConsumption
      .addCase(fetchDailyConsumption.pending, handlePending)
      .addCase(fetchDailyConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayNotes = action.payload.dailyCount;
        state.chosenDate = action.payload.date;
        state.todayTotal = action.payload.totalWater;
      })
      .addCase(fetchDailyConsumption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.dayNotes = [];
        state.chosenDate = action.meta.arg;
        state.todayTotal = null;
      })

      // fetchMonthlyConsumption
      .addCase(fetchMonthlyConsumption.pending, handlePending)
      .addCase(fetchMonthlyConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.monthNotes = action.payload;
      })
      .addCase(fetchMonthlyConsumption.rejected, handleRejected)

      // addConsumption
      .addCase(addConsumption.pending, handlePending)
      .addCase(addConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayNotes = action.payload.dailyCount;
        state.todayTotal = action.payload.totalWater;
      })
      .addCase(addConsumption.rejected, handleRejected)

      // deleteConsumption
      .addCase(deleteConsumption.pending, handlePending)
      .addCase(deleteConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayNotes = action.payload.dailyCount;
        state.todayTotal = action.payload.totalWater;
      })
      .addCase(deleteConsumption.rejected, handleRejected)

      // updateConsumption
      .addCase(updateConsumption.pending, handlePending)
      .addCase(updateConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayNotes = action.payload.dailyCount;
        state.todayTotal = action.payload.totalWater;
      })
      .addCase(updateConsumption.rejected, handleRejected),
});

export const waterReducer = waterSlice.reducer;
