export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectUserMail = state => state.auth.user.email;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectState = state => state.auth;

export const selectDailyNorma = state => state.auth.user.dailyNorma;

export const selectVerified = state => state.auth.user.isVerified;

export const selectGoal = state => state.auth.user.goal;

export const selectLoading = state => state.auth.loading;
