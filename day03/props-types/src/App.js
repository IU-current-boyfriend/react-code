import React from 'react';
import BaseComponent from './BaseComponent';

export default class App extends React.Component {
  state = {
    title: 'hello React'
  }

  render() {
    const { title } = this.state;
    return (
      <div className='warpper'>
        {/* 未传递title属性 */}
        <BaseComponent />
        {/* 传递title属性 */}
        <BaseComponent title={title} />
      </div>
    );
  }
}
