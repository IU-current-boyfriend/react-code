import { PureComponent } from "react";
import { Provider } from 'react-redux';
import HomeComponent from "./components/HomeComponent";
import DetailComponent from "./components/DetailComponent";
import DetailCopy from "./components/DetailCopy";
import Store from './store/index';




export default class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <Provider store={Store}>
          <HomeComponent />
          <DetailComponent />
          <DetailCopy />
        </Provider>
      </div>
    )
  }
}