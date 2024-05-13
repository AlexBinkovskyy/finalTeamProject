import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://finalteamproject-backend.onrender.com/api';

export const fetchConsumption = createAsyncThunk(
  'consumption/fetchall',
  async (values, thunkAPI) => {
    try {
      const response = await axios.get(`/water/monthconsumption/${values}`);
      return response.data;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const addConsumption = createAsyncThunk(
  'consumption/addConsumption',
  async (values, thunkAPI) => {
    try {
      const response = await axios.post('/consumption', values);
      return response.data;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const deleteConsumption = createAsyncThunk(
  'consumption/deleteConsumption',
  async (consumptionID, thunkAPI) => {
    try {
      const response = await axios.delete(`/consumption/${consumptionID}`);
      return response.data;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const updateConsumption = createAsyncThunk(
  'consumption/updateConsumption',
  async ({ id, amount, time }, thunkAPI) => {
    try {
      const response = await axios.patch(`/consumption/${id}`, {
        amount,
        time,
      });
      return response.data;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);
