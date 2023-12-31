import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    searchDataUpdate: (state, action) => { state.searchData = action.payload; },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
  searchDataUpdate,
} = actions;
