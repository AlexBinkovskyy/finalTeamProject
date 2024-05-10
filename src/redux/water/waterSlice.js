import { createSlice } from '@reduxjs/toolkit';
import {
  addConsumption,
  deleteConsumption,
  fetchConsumption,
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
      .addCase(fetchConsumption.pending, handlePending)
      .addCase(fetchConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchConsumption.rejected, handleRejected)

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
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteConsumption.rejected, handleRejected)

      .addCase(updateConsumption.pending, handlePending)
      .addCase(updateConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedConsumption = action.payload;
        const index = state.items.findIndex(
          item => item.id === updatedConsumption.id
        );
        if (index !== -1) {
          state.items[index] = updatedConsumption;
        }
      })
      .addCase(updateConsumption.rejected, handleRejected),
});

export const waterReducer = waterSlice.reducer;
