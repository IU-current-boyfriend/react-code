import { PureComponent } from "react";
import { connect } from 'react-redux';
import {
  addTodoList,
  removeTodoList
} from '../store/todo/index';

class TodoListComponent extends PureComponent {
  render() {
    const { todoListData, addTodoListAction, removeTodoListAction } = this.props;
    return (
      <div className="todo-list">
        <div className="list-container">
          {
            todoListData.map(todo => (
              <div className="list" key={todo.id}>
                <span>{todo.content}</span>
                <button onClick={() => removeTodoListAction(todo.id)}>REMOTE TODO</button>
              </div>
            ))
          }
        </div>
        <div className="btns-container">
          <button onClick={() => addTodoListAction({
            id: new Date().getTime(),
            content: `todoList-${new Date().getTime()}`
          })}>ADD TODO</button>
        </div>
      </div>
    );
  }
}


const mapStatesToProps = (state) => {
  return {
    todoListData: state.todoList.todoListData
  }
}

/**
 * 我可以自己写个中间件来处理日志打印的问题,
 * 整体的思路就是寻思如何能够劫持到dispatch派发行为，然后做自己想要做的事情；
 * @param {*} dispatch 
 * @returns 
 */



/**
 * RTK工具自定义中间件
 * @param {*} param0 
 */
const actionsLogMiddleWare = ({
  actionFn,
  actionPayload,
  dispatch,
}) => {
  const actionNextFn = () => {
    return (dispatch, getState) => {
      const { type, payload } = actionFn(actionPayload);
      console.log(`触发的行为 - ${type},  触发时携带的载体`, payload);
      // 触发行为
      dispatch(actionFn(actionPayload));
      console.log('触发行为后的结果 - ', getState());
    }
  }
  dispatch(actionNextFn());
}



const mapActionsToProps = (dispatch) => {
  return {
    addTodoListAction(todo) {
      actionsLogMiddleWare({
        actionFn: addTodoList,
        actionPayload: todo,
        dispatch,
      });
    },
    removeTodoListAction(id) {
      actionsLogMiddleWare({
        actionFn: removeTodoList,
        actionPayload: id,
        dispatch,
      });
    }
  }
}

export default connect(mapStatesToProps, mapActionsToProps)(TodoListComponent);