import { PureComponent } from "react";
import NormalCssStyle from './normal.module.css';


export default class NormalCss extends PureComponent {
  render() {
    return (
      <div className="normal-css-container">
        <div className={NormalCssStyle.title}>我是normal-css-container中的title</div>
      </div>
    );
  }
}