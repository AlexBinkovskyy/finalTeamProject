import { createSlice } from '@reduxjs/toolkit';
import {
  signup,
  signin,
  signout,
  refreshUser,
  updateUserSettings,
  // verifyEmail,
} from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  reducers: {
    verifyEmailSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    tokenIsInvalid: state => {
      state.isLoggedIn = false;
    },
    userIsLoggedIn: state => {
      state.isLoggedIn = true;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signout.fulfilled, state => {
        state.user = {};
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(updateUserSettings.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(updateUserSettings.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const { verifyEmailSuccess, tokenIsInvalid, userIsLoggedIn } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
