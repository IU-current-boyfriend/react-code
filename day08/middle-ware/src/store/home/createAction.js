import axios from 'axios';
/**
 * 
 * createHomeAction返回的是一个对象，但是action内部要有异步操作，
 * 正是因为有这个异步操作，所以action返回的action对象内部的数据将会存在
 * 同步异步的问题，所以解决方式通过引入thunk中间件解决
 * 
 * @param {*} param0 
 * @returns 
 */
// export const createHomeAction = ({
//   type,
//   payload
// }) => {
//   return {
//     type,
//     payload
//   }
// }

export const asyncCreateHomeAction = ({
  type,
  payload
}) => {
  return (dispatch, getState) => {
    axios('http://localhost:3000/get_list').then(res => {
      const { banners, comments } = res.data.data;
      dispatch({
        type,
        payload: {
          banners,
          comments
        }
      });
    })
  }
}