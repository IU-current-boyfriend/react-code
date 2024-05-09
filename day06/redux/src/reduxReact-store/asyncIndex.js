import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import {
  initialState
} from './asyncInitialState';

import {
  COMMENTS_ACTION,
  BANNERS_ACTION,
  FETCH_HOME_ACTION
} from './actionType';


const detailAsyncReducer = (state = initialState, { type, pyload }) => {
  switch (type) {
    case COMMENTS_ACTION:
      return {
        ...state,
        banners: pyload
      }
    case BANNERS_ACTION:
      return {
        ...state,
        comments: pyload
      }
    case FETCH_HOME_ACTION:
      return {
        ...state,
        banners: pyload.banners,
        comments: pyload.comments,
      }
    default:
      return state;
  }
}



const store = createStore(detailAsyncReducer, applyMiddleware(thunk));


export default store;