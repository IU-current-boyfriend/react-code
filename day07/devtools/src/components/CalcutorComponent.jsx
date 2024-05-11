import {
  PureComponent
} from 'react';

import {
  connect
} from 'react-redux';

import {
  createActions
} from '../store/calcultor/actions';

import {
  CALCULTOR_ADD,
  CALCULTOR_REDUCER,
  CALCULTOR_MULITIP,
  CALCULTOR_DIVISION
} from '../store/calcultor/actionTypes';

class CalcutorComponent extends PureComponent {
  render() {
    const { count, addCount, reduceCount, multipCount, divsionCount } = this.props;
    return (
      <div className="calcutor-contianer">
        <h2 className='title'>count: {count}</h2>
        <button onClick={() => addCount({ type: CALCULTOR_ADD, pyload: { count: 1 } })}>ADD COUNT</button>
        <button onClick={() => reduceCount({ type: CALCULTOR_REDUCER, pyload: { count: 2 } })}>REDUCER COUNT</button>
        <button onClick={() => multipCount({ type: CALCULTOR_MULITIP, pyload: { count: 3 } })}>MULITIP COUNT</button>
        <button onClick={() => divsionCount({ type: CALCULTOR_DIVISION, pyload: { count: 4 } })}>DIVSION COUNT</button>
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
    addCount({ type, pyload }) {
      dispatch(createActions({
        type,
        pyload
      }))
    },
    reduceCount({ type, pyload }) {
      dispatch(createActions({
        type,
        pyload
      }))
    },
    multipCount({ type, pyload }) {
      dispatch(createActions({
        type,
        pyload
      }))
    },
    divsionCount({ type, pyload }) {
      dispatch(createActions({
        type,
        pyload
      }))
    }
  }
}

export default connect(mapStatesToProps, mapActionsToProps)(CalcutorComponent);