import api from '../../Interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDailyConsumption = createAsyncThunk(
  'consumption/fetchDay',
  async (date, thunkAPI) => {
    try {
      const response = await api.get(`/water/dayconsumption/${date}`);
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
      const response = await api.get(`/water/monthconsumption/${date}`);
      return response.data;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const addConsumption = createAsyncThunk(
  'consumption/addConsumption',
  async (values, thunkAPI) => {
    // console.log("add before return");
    // return await api
    // .post('/water/add', values)
    // .then(item => {
    //   console.log("add in then");
    //   return item.data})

    //   .catch(err => thunkAPI.rejectWithValue(err.message));

      try {
        const response = await api.post('/water/add', values);
        return response.data;
      } catch (er) {
        return thunkAPI.rejectWithValue(er.message);
      }
  }
);

export const deleteConsumption = createAsyncThunk(
  'consumption/deleteConsumption',
  async (consumptionID, thunkAPI) => {
    // console.log("delete before return");
    // return await api
    //   .delete(`/water/delete/${consumptionID}`)
    //   .then(item => {
    //     console.log("delete in then");
    //     return item.data})
    //   .catch(err => thunkAPI.rejectWithValue(err.message));

    try {
      const response = await api.delete(`/water/delete/${consumptionID}`);
      return response.data;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);

export const updateConsumption = createAsyncThunk(
  'consumption/updateConsumption',
  async ({ _id, amount, time }, thunkAPI) => {
    try {
      const response = await api.put(`/water/edit/${_id}`, {
        amount,
        time,
      });
      return response.data;
    } catch (er) {
      return thunkAPI.rejectWithValue(er.message);
    }
  }
);
