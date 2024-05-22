// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css';
import {
  createBrowserRouter,
  // createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import Welcome from './components/Welcome.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Error from './components/Error.jsx';
import Product from './components/Product.jsx';
import Detail from './components/Detail.jsx';
import { loader as DetailLoader } from './api/index.js';
/**
 * 先说一说createBrowserRouter和createHashRouter的区别：
 *  createBrowserRouter其实是history路由模式
 *  createHashRouter其实是hash路由模式
 *  hisotry路由模式于hash模式的区别在于请求时的地址问题，
 *  hash模式只会在请求的时候，把#符号之后的字符传递给后端；
 *  histroy模式在请求的时候，把url地址都传递给后端，所以后端需要匹配每个存在的url地址，否则就
 *  会发生not found的情况。
 * 
 * 
 */
// console.log('browser Router: =>', createBrowserRouter);
// console.log('hash router :=>', createHashRouter);
// console.log('provider: =>', RouterProvider);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
    errorElement: <Error />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/About',
    element: <About />
  },
  {
    path: '/product',
    element: <Product />,
    children: [
      {
        path: 'detail/:id',
        element: <Detail />,
        loader: DetailLoader
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
