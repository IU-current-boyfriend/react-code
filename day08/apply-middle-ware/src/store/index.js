import { configureStore } from '@reduxjs/toolkit';
import todoListSlice from './todo/index';


const store = configureStore({
  reducer: {
    todoList: todoListSlice
  }
});

export default store;