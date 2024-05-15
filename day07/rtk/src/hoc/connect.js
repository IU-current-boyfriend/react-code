import { PureComponent } from "react";
import { ConnectContext } from "./context";

/**
 * 
 *  connect与store的耦合度太高，用户要是用connect的前提，store文件必须在'../store/index',
 *  这就有问题了。
 * 
 *  想办法在connect文件中将store引入去除，然后又能够注入到connect函数返回到组件中。
 *  就想到了Context上下文。
 * 
 * 
*/
// import store from '../store/index';


export const connect = (mapStateToProps, mapActionsToProps) => {
  return (WarpperComponent) => {

    class ConnectComponent extends PureComponent {
      constructor(props, context) {
        super(props);
      }

      componentDidMount() {
        // 当state变化的时候，更新组件状态
        this.unsubscribe = this.context.subscribe(() => {
          // 重新调用渲染render函数
          this.setState(mapStateToProps(this.context.getState()));
        })
      }

      componentWillUnmount() {
        // 停止对state状态的监听
        this.unsubscribe();
      }

      render() {
        const states = mapStateToProps(this.context.getState());
        const dispatchAction = mapActionsToProps(this.context.dispatch);
        return (
          <WarpperComponent {...this.props}  {...states} {...dispatchAction} />
        );
      }

    }

    // 接受上下文 
    ConnectComponent.contextType = ConnectContext;

    return ConnectComponent;
  }
}