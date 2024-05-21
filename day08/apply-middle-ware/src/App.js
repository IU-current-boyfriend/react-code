import { PureComponent } from 'react';
import TodoListComponent from './components/TodoListComponent';
export default class App extends PureComponent {
  render() {
    return (
      <div className='app-container'>
        <TodoListComponent />
      </div>
    );
  }
}