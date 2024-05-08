import { PureComponent } from "react";
import { Provider } from 'react-redux';
import HomeApp from './reduxReact-store/home';
import AboutApp from './reduxReact-store/about';
import Detail from "./reduxReact-store/detail";
import store from './reduxReact-store/index';


export default class ReduxReactApp extends PureComponent {
  render() {
    return (
      <div className="warpper">
        <Provider store={store}>
          <HomeApp />
          <AboutApp />
          <Detail />
        </Provider>
      </div>
    )
  }
}