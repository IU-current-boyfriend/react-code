import axios from 'axios';
// import {
//   redirect
// } from 'react-router-dom';
export const getBannersApi = () => {
  return axios.get('http://localhost:3000/get_list');
}

export const loader = async ({ params }) => {
  const res = await getBannersApi();
  // redirect重定向是在loader中使用的，和我们学的那个Navigate组件不一样
  // 如果comments数据存在的话，那么就可以直接重定向到其它页面
  // if (res.data.data.comments) return redirect('/About');
  return {
    banners: res.data.data.banners,
    id: params.id
  }
}