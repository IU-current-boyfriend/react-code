// import { PureComponent, memo } from 'react';
import { memo } from 'react';
// Link组件，相当于a链接
import { Link, Outlet } from 'react-router-dom';
// link组件与a链接的对比，a链接会请求后端，你会发现网页闪一下闪一下的，而link组件并不会请求后端。

// export default class Product extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.productList = [
//       {
//         id: 1,
//         name: '小米手机',
//         url: 'detail/1'
//       },
//       {
//         id: 2,
//         name: '华为手机',
//         url: 'detail/2'
//       },
//       {
//         id: 3,
//         name: 'apple手机',
//         url: 'detail/3'
//       }
//     ]
//   }
//   render() {
//     const { productList } = this;
//     return (
//       <div className="product-container">
//         {
//           productList && productList.map(pd => (
//             // <span style={{ marginLeft: '10px' }} key={pd.id}>
//             //   <a href={pd.url}>
//             //     {pd.name}
//             //   </a>
//             // </span>
//             <span key={pd.id} style={{ marginLeft: '10px' }}>
//               <Link to={pd.url} > {pd.name} </Link>
//             </span>
//           ))
//         }
//         <div className="content">
//           {/* 嵌套路由 */}
//           <Outlet />
//         </div>
//       </div>
//     );
//   }
// }

export default memo(function Product() {
  const productList = [
    {
      id: 1,
      name: '小米手机',
      url: 'detail/1'
    },
    {
      id: 2,
      name: '华为手机',
      url: 'detail/2'
    },
    {
      id: 3,
      name: 'apple手机',
      url: 'detail/3'
    }
  ]
  return (
    <div className="product-container">
      {
        productList && productList.map(pd => (
          // <span style={{ marginLeft: '10px' }} key={pd.id}>
          //   <a href={pd.url}>
          //     {pd.name}
          //   </a>
          // </span>
          <span key={pd.id} style={{ marginLeft: '10px' }}>
            <Link to={pd.url} > {pd.name} </Link>
          </span>
        ))
      }
      <div>
        {/* 嵌套路由 */}
        <Outlet />
      </div>
    </div>
  );
})

