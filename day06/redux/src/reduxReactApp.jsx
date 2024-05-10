import { PureComponent } from "react";
import { Provider } from 'react-redux';
import HomeApp from './reduxReact-store/home';
import AboutApp from './reduxReact-store/about';
import Detail from "./reduxReact-store/detail";
import store from './reduxReact-store/index';
import DetailAsyncCopy from "./reduxReact-store/detail-async-copy";
import DetailAsyncStore from './reduxReact-store/asyncIndex';


export default class ReduxReactApp extends PureComponent {
  render() {
    return (
      <div className="warpper">
        {/* <Provider store={store}>
          <HomeApp />
          <AboutApp />
          <Detail />
        </Provider> */}
        <Provider store={DetailAsyncStore}>
          <DetailAsyncCopy />
        </Provider>
      </div>
    )
  }
}