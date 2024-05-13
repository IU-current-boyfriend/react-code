// detail的slice
import { createSlice } from '@reduxjs/toolkit';


const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    count: 0
  },
  reducers: {
    addCount(state, { payload }) {
      state.count = payload.count + state.count;
    },
    reduceCount(state, { payload }) {
      state.count = state.count - payload.count;
    }
  }
});


export const { addCount, reduceCount } = detailSlice.actions;

// 这个地方的reducer需要注意一下，和上面slice中的reducers不一样
export default detailSlice.reducer;