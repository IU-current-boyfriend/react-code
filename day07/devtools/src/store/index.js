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
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  home: HomeReducer,
  calcultor: CalcultorReducer
});


const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));



export default store;

