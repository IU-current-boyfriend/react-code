import { ADDCOUNT, REDUCERCOUNT } from "./contants";
import initialState from "./initialState";

const calcultorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDCOUNT:
      return {
        ...state,
        count: state.count + payload
      }
    case REDUCERCOUNT:
      return {
        ...state,
        count: state.count - payload
      }
    default:
      return state;
  }
}

export default calcultorReducer;