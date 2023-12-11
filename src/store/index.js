import { configureStore } from '@reduxjs/toolkit';
import table from '../Components/Table/tableSlice';

const store = configureStore({
  reducer: { table },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
