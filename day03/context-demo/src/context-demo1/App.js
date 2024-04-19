import React from 'react';
import {
  PropsContext
} from '../ctx/index';
import BaseSubComponent from './BaseSubComponent';


export class App extends React.Component {
  state = {
    header: 'app header-container',
    main: 'app main-container',
    footer: 'app footer-container'
  }
  render() {
    return (
      <div className="warpper">
        <PropsContext.Provider value={{ ...this.state }}>
          <BaseSubComponent />
        </PropsContext.Provider>
      </div>)
  }
}
