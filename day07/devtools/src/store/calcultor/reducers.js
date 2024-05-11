import { initialState } from "./state";
import {
  CALCULTOR_ADD,
  CALCULTOR_DIVISION,
  CALCULTOR_MULITIP,
  CALCULTOR_REDUCER
} from './actionTypes';

const CalcultorReducer = (state = initialState, { type, pyload }) => {
  switch (type) {
    case CALCULTOR_ADD:
      return {
        ...state,
        count: state.count + pyload.count
      }
    case CALCULTOR_REDUCER:
      return {
        ...state,
        count: state.count - pyload.count
      }
    case CALCULTOR_MULITIP:
      return {
        ...state,
        count: state.count * pyload.count
      }
    case CALCULTOR_DIVISION:
      return {
        ...state,
        count: state.count / pyload.count
      }
    default:
      return state;
  }

}

export default CalcultorReducer;