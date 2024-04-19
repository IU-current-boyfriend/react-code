import React from 'react';
import {
  PropsContext
} from '../ctx/index';

export default class BaseSubComponent extends React.Component {
  render() {
    const { header, main, footer } = this.context;

    console.log('this.context: =>', this.context);
    return (
      <div className='warpper'>
        <div className='header-container'>{header}</div>
        <div className="main-container">{main}</div>
        <div className="footer-container">{footer}</div>
      </div>
    );
  }
}

BaseSubComponent.contextType = PropsContext;


// export default class BaseSubComponent extends React.Component {
//   render() {
//     return (
//       <PropsContext.Consumer>
//         {
//           ({ header, main, footer }) => (
//             <div className='warpper'>
//               <div className='header-container'>{header}</div>
//               <div className="main-container">{main}</div>
//               <div className="footer-container">{footer}</div>
//             </div>
//           )
//         }
//       </PropsContext.Consumer>
//     );
//   }
// }