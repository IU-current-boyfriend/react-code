import { PureComponent } from "react"
import store from '../reduxReact-store/index';
import {
  CALCULTOR_ADD_TODO,
  CALCULTOR_REDUCER_TODO,
  CALCULTOR_MULITIP_TODO,
  CALCULTOR_DIVISION_TODO
} from '../reduxReact-store/actionType';
import { createCalcultorAction } from '../reduxReact-store/createActions';

export default class AboutApp extends PureComponent {
  state = {
    count: store.getState().count
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ count: store.getState().count });
    })
  }


  render() {
    const { count } = this.state;
    return (
      <div className="about-container">
        <div className="title">about count: {count}</div>
        <div className="btn-container">
          <button onClick={() => store.dispatch(createCalcultorAction({
            type: CALCULTOR_ADD_TODO,
            pyload: {
              count: 1
            }
          }))}>ADD_COUNT</button>
          <button onClick={() => store.dispatch(createCalcultorAction({
            type: CALCULTOR_REDUCER_TODO,
            pyload: {
              count: 2
            }
          }))}>REDUCE_COUNT</button>
          <button onClick={() => store.dispatch(createCalcultorAction({
            type: CALCULTOR_MULITIP_TODO,
            pyload: {
              count: 3
            }
          }))}>MULTIP_COUNT</button>
          <button onClick={() => store.dispatch(createCalcultorAction({
            type: CALCULTOR_DIVISION_TODO,
            pyload: {
              count: 4
            }
          }))}>DIVISION_COUNT</button>
        </div>
      </div >
    );
  }
}