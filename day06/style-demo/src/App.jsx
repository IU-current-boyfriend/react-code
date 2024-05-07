import { PureComponent } from "react";
import NormalCss from "./components/NormalCss";
import NormalCss2 from "./components/NormalCss2";
import AppWarpper from "./components/AppWarpper";
// 针对css普通样式的引入
// import './normalCss.css';
// import './normalCss2.css';
export default class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <NormalCss />
        <NormalCss2 />
        <AppWarpper />
      </div>
    );
  }
}