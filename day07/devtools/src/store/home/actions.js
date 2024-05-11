import axios from 'axios';

export const createFetchHomeData = (type) => {
  return (dispatch, getState) => {
    axios.get('http://localhost:3000/get_list').then(res => {
      const { banners, comments } = res.data.data;
      dispatch({
        type, pyload: {
          homeBanners: banners,
          homeAsides: comments
        }
      });
    })
  }
}