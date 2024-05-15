import { PureComponent } from "react";
// import { connect } from 'react-redux';
import store from '../store/index';
import {
  addCount,
  reduceCount
} from '../store/detail/index';

class DetailCopy extends PureComponent {
  render() {
    const { count, addCountAction, reduceCountAction } = this.props;
    return (
      <div className="detail-component-container">
        <div className="count">Count: {count}</div>
        <button onClick={() => addCountAction(1)}>ADD COUNT 1</button>
        <button onClick={() => reduceCountAction(2)}>REDUCER COUNT 2</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('state: =>', state);
  return {
    count: state.detail.count
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    addCountAction(num) {
      dispatch(addCount({
        count: num
      }));
    },
    reduceCountAction(num) {
      dispatch(reduceCount({
        count: num
      }));
    }
  }
}


/**
 * 
 * connect()()执行完后，返回一个组件，那么可以表明connect是一个高阶组件
 * 
 * 
 */

const connect = (mapStateToProps, mapActionsToProps) => {
  return (WarpperComponent) => {
    return class ConnectComponent extends PureComponent {

      componentDidMount() {
        // 当state变化的时候，更新组件状态
        this.unsubscribe = store.subscribe(() => {
          // 重新调用渲染render函数
          this.setState(mapStateToProps(store.getState()));
        })
      }

      componentWillUnmount() {
        // 停止对state状态的监听
        this.unsubscribe();
      }

      render() {
        const states = mapStateToProps(store.getState());
        const dispatchAction = mapActionsToProps(store.dispatch);
        return (
          <WarpperComponent {...this.props}  {...states} {...dispatchAction} />
        );
      }
    }
  }
}


export default connect(mapStateToProps, mapActionsToProps)(DetailCopy);
