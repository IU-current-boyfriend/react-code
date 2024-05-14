import { configureStore } from '@reduxjs/toolkit';
import DetailSlice from './detail/index';
import HomeSlice from './home/index';


const store = configureStore({
  reducer: {
    detail: DetailSlice,
    home: HomeSlice
  }
});

export default store;