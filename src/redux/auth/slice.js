import { createSlice } from '@reduxjs/toolkit';
import {
  signup,
  signin,
  signout,
  refreshUser,
  updateUserSettings,

} from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  reducers: {
    verifyEmailSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload;
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
      // signup
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, state => {
        state.isRefreshing = false;
      })

      // signin
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(signin.rejected, state => {
        state.isRefreshing = false;
      })

      // signout
      .addCase(signout.fulfilled, state => {
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(signout.rejected, state => {
        state.isRefreshing = false;

        // check
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
      })

      // refreshUser
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

        // check
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
      })

      // updateUserSettings
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

        // check
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
      });
  },
});

export const { verifyEmailSuccess, tokenIsInvalid, userIsLoggedIn } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
