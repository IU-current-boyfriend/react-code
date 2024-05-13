import { PureComponent } from "react";
import { Provider } from 'react-redux';
import HomeComponent from "./components/HomeComponent";
import DetailComponent from "./components/DetailComponent";
import Store from './store/index';


export default class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <Provider store={Store}>
          <HomeComponent />
          <DetailComponent />
        </Provider>
      </div>
    )
  }
}