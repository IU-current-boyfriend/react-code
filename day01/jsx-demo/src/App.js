import React from 'react';

class App extends React.Component {
  rt() {
    return <span>我是rt函数返回的内容</span>
  }
  render() {
    return (
      <div
        className={this.dynamic}
        style={{ color: 'red' }}
      >
        {this.rt()}
      </div >
    );
  }
}

export default App;