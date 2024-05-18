export const selectLoadingStatus = state => state.water.loading;

export const selectError = state => state.water.error;

export const selectMonth = state => state.water.monthNotes;

export const selectDay = state => state.water.dayNotes.amount;

export const selectDayState = state => state.water.dayNotes;

export const selectChosenDate = state => state.water.chosenDate;

export const selectTodayTotal = state => state.water.todayTotal;
