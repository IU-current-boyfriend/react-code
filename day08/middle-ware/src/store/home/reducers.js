import { FETCHHOMEDATAACTION } from '../home/contants';
import initialState from './initialState';
const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHHOMEDATAACTION:
      return {
        ...state,
        banners: payload.banners,
        comments: payload.comments
      };
    default:
      return state;
  }
}

export default homeReducer;