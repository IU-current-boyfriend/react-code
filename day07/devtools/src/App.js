import { PureComponent } from 'react';
import HomeComponent from './components/HomeComponent';
import CalcutorComponent from './components/CalcutorComponent';
// import HomeStore from './store/home/index';
// import CalcultorStore from './store/calcultor/index';
import store from './store/index';
import { Provider } from 'react-redux';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        {/* 没有利用combineReducers合并多个reducers */}
        {/* <Provider store={HomeStore}>
          <HomeComponent />
        </Provider>
        <Provider store={CalcultorStore}>
          <CalcutorComponent />
        </Provider> */}

        {/* 使用combineReducers合并多个reducers */}
        <Provider store={store}>
          <HomeComponent />
          <CalcutorComponent />
        </Provider>
      </div>
    );
  }
}