// home的slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// 异步操作,名称为了在调试的时候展示
export const fetchHomeAction = createAsyncThunk('fetch/HomeMultidata', async (
  extraInfo,
  {
    dispatch,
    getState
  }) => {
  const res = await axios.get('http://localhost:3000/get_list');
  // const { banners, comments } = res.data.data;
  // 异步的一种方式
  // dispatch(changeBannersAction({
  //   banners
  // }));
  // dispatch(changeCommentsAction({
  //   comments
  // }));
  // 不能直接return res，不然会导致序列化失败
  return res.data.data;
});



const homeSlice = createSlice({
  name: 'home',
  initialState: {
    banners: [],
    comments: []
  },
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload.banners;
    },
    changeCommentsAction(state, { payload }) {
      state.comments = payload.comments;
    }
  },
  // 这种方式会抛出错误
  // extraReducers: {
  //   [fetchHomeAction.pending](state, actions) {
  //     console.log('peding: =>', actions);
  //   },
  //   [fetchHomeAction.fulfilled](state, actions) {
  //     console.log('fulfilled: =>', actions);

  //   },
  //   [fetchHomeAction.rejected](state, actions) {
  //     console.log('rejected: =>', actions);
  //   }
  // }
  extraReducers: builder => {
    builder.addCase(fetchHomeAction.pending, (state, action) => {
      console.log('pending: =>', action);
    }).addCase(fetchHomeAction.fulfilled, (state, { payload }) => {
      // const { banners, comments } = payload.data.data;
      // state.banners = banners;
      // state.comments = comments;
      console.log('pyload: =>', payload);
      const { banners, comments } = payload;
      state.banners = banners;
      state.comments = comments;
    }).addCase(fetchHomeAction.rejected, (state, action) => {
      // return action.payload;
      console.log('action: =>', action);
    })
  }
});


export const { changeBannersAction, changeCommentsAction } = homeSlice.actions;
export default homeSlice.reducer;