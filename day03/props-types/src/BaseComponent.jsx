import React from 'react';
import PropTypes from 'prop-types';

export default class BaseComponent extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div className='base-component'>
        <h2>{title}</h2>
      </div>
    );
  }
}

// BaseComponent的Props属性校验
BaseComponent.propTypes = {
  title: PropTypes.string.isRequired,
}
// BaseComponent的Props属性默认值写法
BaseComponent.defaultProps = {
  title: '默认标题'
}