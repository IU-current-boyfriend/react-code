import { PureComponent } from "react";
import { connect } from 'react-redux';
import {
  ADDCOUNT,
  REDUCERCOUNT
} from '../store/calcultor/contants';

import { createCalcultorAction } from '../store/calcultor/createAction';

class CalCultorComponent extends PureComponent {
  render() {
    const { count, addCount, reduceCount } = this.props;
    return (
      <div className="calcultor-container">
        <h2 className="title">count: {count}</h2>
        <button onClick={() => addCount(2)}>ADD COUNT 2</button>
        <button onClick={() => reduceCount(2)}>REDUCE COUNT 2</button>
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    count: state.calcultor.count
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    addCount(payload) {
      dispatch(createCalcultorAction({
        type: ADDCOUNT,
        payload,
      }));
    },
    reduceCount(payload) {
      dispatch(createCalcultorAction({
        type: REDUCERCOUNT,
        payload
      }));
    }
  }
}

export default connect(mapStatesToProps, mapActionsToProps)(CalCultorComponent);