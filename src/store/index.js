import { configureStore } from '@reduxjs/toolkit';

import table from '../Components/Table/tableSlice';
import filters from '../Components/Filters/filtersSlice';

const store = configureStore({
  reducer: { table, filters },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
