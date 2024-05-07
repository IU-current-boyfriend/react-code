import { PureComponent } from "react";
import NormalCss2Style from './normal2.module.css';

export default class NormalCss2 extends PureComponent {
  render() {
    return (
      <div className="normal-css2-container">
        <div className={NormalCss2Style.title}>我是normal-css2-container中的title</div>
      </div>
    );
  }
}