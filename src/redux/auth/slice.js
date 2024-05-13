import { createSlice } from '@reduxjs/toolkit';
import { signup, signin, signout, refreshUser } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isEmailVerified: false,
  },
  reducers: {
    verifyEmailSuccess: (state, action) => {
      state.isEmailVerified = true;
      state.isLoggedIn = state.isEmailVerified;
      state.token = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        console.log(state.user);
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.loggedUser;
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
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const { verifyEmailSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
