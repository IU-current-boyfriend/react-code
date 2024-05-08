import { PureComponent } from "react";
import { connect } from "react-redux";
import { createCalcultorAction } from "./createActions";
import { CALCULTOR_ADD_TODO, CALCULTOR_MULITIP_TODO, CALCULTOR_REDUCER_TODO, CALCULTOR_DIVISION_TODO } from "./actionType";

class Detail extends PureComponent {
  render() {
    const { count, addCount, reduceCount, multipCount, divsionCount } = this.props;

    return (
      <div className="detail-container">
        <div className="title">detail-count: {count}</div>
        <div className="btn-container">
          <button onClick={() => addCount(CALCULTOR_ADD_TODO,
            {
              count: 1
            })}>ADD_COUNT</button>
          <button onClick={() => reduceCount(CALCULTOR_REDUCER_TODO,
            {
              count: 2
            })}>REDUCE_COUNT</button>
          <button onClick={() => multipCount(CALCULTOR_MULITIP_TODO,
            {
              count: 3
            })}>MULTIP_COUNT</button>
          <button onClick={() => divsionCount(CALCULTOR_DIVISION_TODO,
            {
              count: 4
            })}>DIVSION_COUNT</button>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    count: state.count
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    addCount(type, pyload) {
      dispatch(createCalcultorAction({
        type,
        pyload
      }));
    },
    reduceCount(type, pyload) {
      dispatch(createCalcultorAction({
        type,
        pyload
      }));
    },
    multipCount(type, pyload) {
      dispatch(createCalcultorAction({
        type,
        pyload
      }));
    },
    divsionCount(type, pyload) {
      dispatch(createCalcultorAction({
        type,
        pyload
      }));
    }
  }
}

export default connect(mapStatesToProps, mapActionsToProps)(Detail);
