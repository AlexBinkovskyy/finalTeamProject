import api from '../../Interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const setAuthHeader = accessToken => {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = '';
};

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ credentials, i18n }, thunkAPI) => {
    try {
      const res = await api.post('/users/register', credentials);
      toast.success(i18n.t('toast.registerEmailSuccess'));
      return res.data;
    } catch (error) {
      toast.error(i18n.t('toast.registerEmailError'));

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async ({ credentials, i18n }, thunkAPI) => {
    try {
      const res = await api.post('/users/login', credentials);
      setAuthHeader(res.data.accessToken);
      toast.success(i18n.t('toast.loginSuccess'),{
        autoClose: 800
      });
      localStorage.setItem(
        `userId_${res.data.user._id}`,
        res.data.refreshToken
      );

      return res.data;
    } catch (error) {
      toast.error(i18n.t('toast.loginError'));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signout = createAsyncThunk(
  'auth/signout',
  async (i18n, thunkAPI) => {
    try {
      await api.post('/users/logout');
      clearAuthHeader();
      toast.success(i18n.t('toast.logoutSuccess'),{
        autoClose: 800
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resendMail = createAsyncThunk(
  'auth/resend',
  async ({ credentials, i18n }, thunkAPI) => {
    try {
      await api.post('/users/verify', credentials);
      toast.success(i18n.t('toast.verificationEmailSuccess'));
    } catch (error) {
      switch (error.response?.status) {
        case 404:
          toast.error(i18n.t('toast.email404'));
          break;
        case 418:
          toast.error(i18n.t('toast.verificationEmail418'));
          break;
        default:
          toast.error(i18n.t('toast.defualtError'));
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const recoverMail = createAsyncThunk(
  'auth/recoverMail',
  async ({ credentials, i18n }, thunkAPI) => {
    try {
      await api.post('/users/passrecovery', credentials);
      toast.success(i18n.t('toast.recoverMailSuccess'));
    } catch (error) {
      toast.error(i18n.t('toast.email404'));

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const recoverPass = createAsyncThunk(
  'auth/recoverPass',
  async ({ credentials, i18n }, thunkAPI) => {
    try {
      await api.patch('/users/passrecovery', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success(i18n.t('toast.recoverPassSuccess'));
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
    const persistedToken = state.auth.accessToken;

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
  async ({ formData, i18n }, thunkAPI) => {
    try {
      const res = await api.put('/users/update', formData);
      toast.success(i18n.t('toast.updateSettingSuccess'));
      return res.data;
    } catch (error) {
      toast.error(i18n.t('toast.updateSettingError'));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUserTokens = createAsyncThunk(
  'auth/refreshTokens',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('users/refreshtoken/', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
