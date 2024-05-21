import { createStore, combineReducers } from 'redux';
import homeReducer from './home/reducers';
import calcultorReducer from './calcultor/reducer';
import applyMyMiddleware from '../middleware';
import {
  logActionMiddleWare,
  logActionThunk
} from '../middleware/middleware';

// import { thunk } from 'redux-thunk';

const reducers = combineReducers({
  home: homeReducer,
  calcultor: calcultorReducer
});



const store = createStore(reducers);

// 执行中间件
applyMyMiddleware(store, logActionMiddleWare, logActionThunk);



// 中间件有点误区，apply-middle-ware不算中间件，属于逻辑抽离
// console.log('store: =>', store.getState());




export default store;