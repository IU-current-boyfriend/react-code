/**
 * 现在因为多个模块的store，我想能不能合成一下处理呢？
 * 因为你看看现在的app.js中，通过Provider组件提供store的方式
 * 是分开提供的，这样我很不喜欢。能不能合并成一个store呢？
 * 
 * 
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import HomeReducer from './home';
import CalcultorReducer from './calcultor';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

// const reducers = combineReducers({
//   home: HomeReducer,
//   calcultor: CalcultorReducer
// });



// const myCombineReducers = (
//   reducersCollect
// ) => {
//   const mapReducersCollect = Object.entries(reducersCollect);
//   const combination = (state = {}, actions) => {
//     const mapReducersObj = {};
//     mapReducersCollect.forEach(item => {
//       const [reducerName, reducerFn] = item;
//       mapReducersObj[reducerName] = reducerFn.call(null, state[reducerName], actions);
//     });
//     return mapReducersObj;
//   }
//   return combination;
// }

// const myCombineReducers = (reducersCollect) => {
//   const combination = (state = {}, actions) => {
//     const reducersMap = {};
//     const reducersCollectMap = Object.entries(reducersCollect);
//     reducersCollectMap.forEach(item => {
//       const [name, reducerFn] = item;
//       reducersMap[name] = reducerFn.call(null, state[name], actions);
//     });
//     /**
//      * 数据格式是什么样子的？
//      * {
//      *  name: reducers.call() => state
//      * }
//      */
//     return reducersMap;
//   }
//   return combination;
// }

// const reducers = myCombineReducers({
//   home: HomeReducer,
//   calcultor: CalcultorReducer
// });


const reducers = combineReducers({
  home: HomeReducer,
  calcultor: CalcultorReducer
});

// console.log('reducers: =>', reducers);


/**
 * 本质上你看reducers是函数形式:
 * 
 **/

// const myCombineReducers = reducersCollect => {
//   return () => {

//   }
// }

// const reducers = myCombineReducers({
//   home: HomeReducer,
//   calcultor: CalcultorReducer
// });


const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));



export default store;

