import { PureComponent } from "react";
import { connect } from 'react-redux';
import {
  addCount,
  reduceCount
} from '../store/detail/index';

class DetailComponent extends PureComponent {
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

export default connect(mapStateToProps, mapActionsToProps)(DetailComponent);