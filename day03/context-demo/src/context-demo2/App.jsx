import React from 'react';
import {
  ThemeContextOne,
  ThemeContextTwo
} from '../ctx/index';
import BaseSubComponent from './BaseSubComponent';

export default class App extends React.Component {
  render() {
    return (
      <div className='warpper'>
        <ThemeContextOne.Provider value={{ theme: 'one-theme' }}>
          <ThemeContextTwo.Provider value={{ theme: 'two-theme' }}>
            <BaseSubComponent />
          </ThemeContextTwo.Provider>
        </ThemeContextOne.Provider>
      </div>
    );
  }
}