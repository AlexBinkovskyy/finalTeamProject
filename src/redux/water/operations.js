import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://finalteamproject-backend.onrender.com/api';

export const fetchDailyConsumption = createAsyncThunk(
  'consumption/fetchDay',
  async (date, thunkAPI) => {
    try {
      const response = await axios.get(`/water/daycosumption/${date}`);
      return response.data;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const fetchMonthlyConsumption = createAsyncThunk(
  'consumption/fetchMonth',
  async (date, thunkAPI) => {
    try {
      const response = await axios.get(`/water/monthconsumption/${date}`);
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
      const response = await axios.post('/water/add', values);
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
      const response = await axios.delete(
        `/consumption/delete/${consumptionID}`
      );
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
      const response = await axios.put(`/water/edit/${id}`, {
        amount,
        time,
      });
      return response.data;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);
