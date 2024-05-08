import { PureComponent } from "react";
import store from './store/index';
import {
  CALCULTOR_ADD_TODO,
  CALCULTOR_DIVISION_TODO,
  CALCULTOR_MULITIP_TODO,
  CALCULTOR_REDUCER_TODO
} from './store/actionType';
import { createCalcultorAction } from './store/createActions';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <div className="calcultor-container">
          <button onClick={() => store.dispatch(createCalcultorAction({
            type: CALCULTOR_ADD_TODO,
            pyload: { count: 1 }
          }))}>ADD COUNT 1</button>

          <button onClick={() => store.dispatch(createCalcultorAction({
            type: CALCULTOR_REDUCER_TODO,
            pyload: { count: 2 }
          }))}>REDUCE COUNT 2</button>

          <button onClick={() => store.dispatch(createCalcultorAction({
            type: CALCULTOR_MULITIP_TODO,
            pyload: { count: 3 }
          }))}>MULITIP COUNT 3</button>

          <button onClick={() => store.dispatch(createCalcultorAction({
            type: CALCULTOR_DIVISION_TODO,
            pyload: { count: 4 }
          }))}>DIVISION COUNT 4</button>

        </div>
      </div>
    );
  }
}