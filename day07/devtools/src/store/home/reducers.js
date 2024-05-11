import {
  initialState
} from './state';

import {
  FETCH_HOME_DATA
} from './actionTypes';

const HomeReducer = (state = initialState, {
  type,
  pyload
}) => {
  switch (type) {
    case FETCH_HOME_DATA:
      return {
        ...state,
        homeBanners: pyload.homeBanners,
        homeAsides: pyload.homeAsides
      }
    default:
      return state;
  }
}

export default HomeReducer;