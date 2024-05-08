import { createStore } from 'redux';
// import { createCalcultorAction } from './createActions';
import {
  initialState
} from './state';
import {
  CALCULTOR_ADD_TODO,
  CALCULTOR_DIVISION_TODO,
  CALCULTOR_MULITIP_TODO,
  CALCULTOR_REDUCER_TODO
} from './actionType';



const calculatorReducer = (state = initialState, { type, pyload }) => {
  switch (type) {
    case CALCULTOR_ADD_TODO:
      return {
        ...state,
        count: state.count + pyload.count
      }
    case CALCULTOR_REDUCER_TODO:
      return {
        ...state,
        count: state.count - pyload.count
      }
    case CALCULTOR_DIVISION_TODO:
      return {
        ...state,
        count: state.count / pyload.count
      }
    case CALCULTOR_MULITIP_TODO:
      return {
        ...state,
        count: state.count * pyload.count
      }
    default:
      return initialState;
  }
}

const store = createStore(calculatorReducer);


// 监听store中的state变化
store.subscribe(() => {
  console.log('监听store中的变化 : =>', store.getState())
});

// store.dispatch(createCalcultorAction({
//   type: CALCULTOR_ADD_TODO,
//   pyload: { count: 1 }
// }));

// store.dispatch(createCalcultorAction({
//   type: CALCULTOR_REDUCER_TODO,
//   pyload: { count: 2 }
// }));

// store.dispatch(createCalcultorAction({
//   type: CALCULTOR_MULITIP_TODO,
//   pyload: { count: 3 }
// }));

// store.dispatch(createCalcultorAction({
//   type: CALCULTOR_DIVISION_TODO,
//   pyload: { count: 4 }
// }));

// store.dispatch({ type: 'add_counter', pyload: { count: 1 } });
// store.dispatch({ type: 'reduce_counter', pyload: { count: 2 } });
// store.dispatch({ type: 'multiply_counter', pyload: { count: 3 } });
// store.dispatch({ type: 'division_counter', pyload: { count: 4 } });

export default store;

