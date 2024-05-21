import { createSlice } from '@reduxjs/toolkit';
import {
  signup,
  signin,
  signout,
  refreshUser,
  updateUserSettings,
  recoverMail,
  recoverPass,
  resendMail,
  refreshUserTokens,

} from './operations';

const handlePending = state => {
  state.isRefreshing = true;
};

const handleFullfilled = state => {
  state.isRefreshing = false;
};

const handleReject = state => {
  state.isRefreshing = false;
};

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
      .addCase(signup.pending, handlePending)
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isRefreshing = false;
      })
      .addCase(signup.rejected, state => {
        state.isRefreshing = false;
      })

      // signin
      .addCase(signin.pending, handlePending)
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
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
      })

      // recoverMail
      .addCase(recoverMail.pending, handlePending)
      .addCase(recoverMail.fulfilled, handleFullfilled)
      .addCase(recoverMail.rejected, handleReject)

      //  recoverPass
      .addCase(recoverPass.pending, handlePending)
      .addCase(recoverPass.fulfilled, handleFullfilled)
      .addCase(recoverPass.rejected, handleReject)

      // resendMail
      .addCase(resendMail.pending, handlePending)
      .addCase(resendMail.fulfilled, handleFullfilled)
      .addCase(resendMail.rejected, handleReject)

      // refreshToken
      .addCase(refreshUserTokens.fulfilled, (state, action) => {
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserTokens.rejected,(state, action) =>{
        state.isLoggedIn = false;
        state.accessToken = null
      });
  },
});

export const { verifyEmailSuccess, tokenIsInvalid, userIsLoggedIn } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
