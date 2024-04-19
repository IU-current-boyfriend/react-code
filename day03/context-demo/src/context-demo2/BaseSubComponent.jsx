import React from 'react';
import {
  ThemeContextOne,
  ThemeContextTwo
} from '../ctx/index';
export default class BaseSubComponent extends React.Component {
  render() {
    return (
      <div className='sub-container'>
        <div className='theme-one-container'>
          <ThemeContextOne.Consumer>
            {
              ({ theme }) => (
                <span className='theme-one'>
                  {theme}
                </span>
              )
            }
          </ThemeContextOne.Consumer >
        </div>
        <div className='theme-two-container'>
          <ThemeContextTwo.Consumer>
            {
              ({ theme }) => (
                <span className='theme-two'>
                  {theme}
                </span>
              )
            }
          </ThemeContextTwo.Consumer>
        </div>
      </div>
    );
  }
}

/**
 * 不能这样写？为什么不能这样写呢？因为我们目的是共享多个
 * context上下文，这样写的话，组件只能使用一个上下文。
 *
 */
// BaseSubComponent.contextType = ThemeContextOne;
// BaseSubComponent.contextType = ThemeContextTwo;