import styled from 'styled-components';
// import * as vars from '../variable/variable';


// 定义变量
// export const AppWrapperStyle = styled.div`
//   .title {
//     color: ${vars.textColor};
//   }
// `;


// 传递props方式一
// export const AppWrapperStyle = styled.div.attrs(props => ({
//   titlecolor: props.titlecolor || 'blue'
// }))`
//   .title {
//     color: ${props => props.titlecolor};
//   }
// `;



// 传递props方式二
// export const AppWrapperStyle = styled.div.attrs(props => {
//   return {
//     titlecolor: props.titlecolor || 'blue'
//   }
// })`
//   .title {
//     color: ${props => props.titlecolor}
//   }
// `


// 子组件共享样式
export const HomeWrapperStyle = styled.div`
  .header {
    background-color: ${props => props.theme.color}
  }
`;

// 样式继承
export const HomeButtonWrapperStyle = styled(HomeWrapperStyle)`
  .title {
    color: yellow;
  }
`;