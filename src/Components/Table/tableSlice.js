import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  employeesLoadingStatus: 'idle',
  daysOfTheWeek: [],
  daysOfTheWeekLoadingStatus: 'idle',
  currentMoth: 'april',
  currentCity: 'Moscow',
};

const scheduleSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    employeesFetching: (state) => { state.employeesLoadingStatus = 'loading'; },
    employeesFetched: (state, action) => {
      state.employeesLoadingStatus = 'idle';
      state.employees = action.payload;
    },
    employeesFetchingError: (state) => { state.employeesLoadingStatus = 'error'; },
    employeeCreated: (state, action) => {
      state.employees.push(action.payload);
    },
    employeeDeleted: (state, action) => {
      state.employees = state.employees.filter((item) => item.id !== action.payload);
    },
    daysOfTheWeekFetching: (state) => { state.daysOfTheWeekLoadingStatus = 'loading'; },
    daysOfTheWeekFetched: (state, action) => {
      state.daysOfTheWeekLoadingStatus = 'idle';
      state.daysOfTheWeek = action.payload;
    },
    daysOfTheWeekFetchingError: (state) => { state.daysOfTheWeekLoadingStatus = 'error'; },
    onMonthChanged: (state, action) => {
      state.currentMoth = action.payload;
    },
    onCityChanged: (state, action) => {
      state.currentCity = action.payload;
    },
  },
});

const { actions, reducer } = scheduleSlice;

export default reducer;
export const {
  employeesFetching,
  employeesFetched,
  employeesFetchingError,
  employeeCreated,
  employeeDeleted,
  daysOfTheWeekFetching,
  daysOfTheWeekFetched,
  daysOfTheWeekFetchingError,
  onMonthChanged,
  onCityChanged,
} = actions;
