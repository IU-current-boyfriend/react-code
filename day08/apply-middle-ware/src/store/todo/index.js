import { createSlice } from '@reduxjs/toolkit';

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    todoListData: [],
  },
  reducers: {
    addTodoList(state, action) {
      /**
       * action => { type: xxx, pyload: todo }
       * 
       */
      const { payload } = action;

      // 添加todoList列表
      state.todoListData.push(payload);
    },
    removeTodoList(state, action) {
      const { payload } = action;
      state.todoListData = state.todoListData.filter(todo => todo.id !== payload);
    }
  }
});

// 导出todoListSlice的actions
export const { addTodoList, removeTodoList } = todoListSlice.actions;

// 导出todoListSlice的reducer
export default todoListSlice.reducer;


// 导出todoListSlice
export {
  todoListSlice
}