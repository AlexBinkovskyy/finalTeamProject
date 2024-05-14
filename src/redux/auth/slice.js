import { createSlice } from '@reduxjs/toolkit';
import {
  signup,
  signin,
  signout,
  refreshUser,
  // verifyEmail,
} from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    // isEmailVerified: false,
  },
  reducers: {
    verifyEmailSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    tokenIsInvalid: state => {
      state.isLoggedIn = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(signin.fulfilled, (state, action) => {
        console.log(action.payload);
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
      });
    // .addCase(verifyEmail.fulfilled, (state, action) => {
    //   state.isEmailVerified = true;
    //   state.isLoggedIn = state.isEmailVerified;
    //   state.token = action.payload;
    // })
  },
});

export const { verifyEmailSuccess, tokenIsInvalid } = authSlice.actions;
export const authReducer = authSlice.reducer;
