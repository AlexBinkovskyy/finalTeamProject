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
    items: [],
    loading: false,
    error: null,
  },

  extraReducers: builder =>
    builder
      .addCase(fetchDailyConsumption.pending, handlePending)
      .addCase(fetchDailyConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.dailyCount;
      })
      .addCase(fetchDailyConsumption.rejected, handleRejected)

      .addCase(fetchMonthlyConsumption.pending, handlePending)
      .addCase(fetchMonthlyConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.dailyCount;
      })
      .addCase(fetchMonthlyConsumption.rejected, handleRejected)

      .addCase(addConsumption.pending, handlePending)
      .addCase(addConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addConsumption.rejected, handleRejected)

      .addCase(deleteConsumption.pending, handlePending)
      .addCase(deleteConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(
          item => item._id !== action.payload._id
        );
      })
      .addCase(deleteConsumption.rejected, handleRejected)

      .addCase(updateConsumption.pending, handlePending)
      .addCase(updateConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedConsumption = action.payload;
        const index = state.items.findIndex(
          item => item._id === updatedConsumption._id
        );
        if (index !== -1) {
          state.items[index] = updatedConsumption;
        }
      })
      .addCase(updateConsumption.rejected, handleRejected),
});

export const waterReducer = waterSlice.reducer;
