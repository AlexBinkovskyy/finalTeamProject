import api from '../../Interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = '';
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/users/register', credentials);
      toast.success(res.data.user.message);
      return res.data;
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/users/login', credentials);
      setAuthHeader(res.data.token);
      toast.success('Welcome to the AquaTrack');
      return res.data;
    } catch (error) {
      toast.error('Incorrect username or password');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signout = createAsyncThunk('auth/signout', async (_, thunkAPI) => {
  try {
    await api.post('/users/logout');
    clearAuthHeader();
    toast.success('Signout success');
  } catch (error) {
    toast.error(error.response.data.message);

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const resendMail = createAsyncThunk(
  'auth/resend',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/users/verify', credentials);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const recoverMail = createAsyncThunk(
  'auth/recoverMail',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/users/passrecovery', credentials);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const recoverPass = createAsyncThunk(
  'auth/recoverPass',
  async (credentials, thunkAPI) => {
    try {
      console.log(credentials);
      const res = await api.patch('/users/passrecovery', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await api.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  'auth/updateSettings',
  async (formData, thunkAPI) => {
    try {
      const res = await api.put('/users/update', formData);
      toast.success('Settings updated successfully');
      return res.data;
    } catch (error) {
      toast.error('Failed to update settings. Please try again.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
