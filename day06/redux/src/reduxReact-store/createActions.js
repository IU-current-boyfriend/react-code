import axios from "axios"

export const createCalcultorAction = ({
  type,
  pyload
}) => {
  return {
    type,
    pyload
  }
}


export const createBannersAction = ({
  type,
  pyload
}) => {
  return {
    type,
    pyload
  }
}

export const createCommentsAction = ({
  type,
  pyload
}) => {
  return {
    type,
    pyload
  }
}


// export const createFetchHomeData = ({
//   type
// }) => {
//   /**
//    * 这里面就有问题了：
//    *  1. 如果我在actions里面完成异步操作，但是我最后要返回对象，那么我肯定确保不了
//    *  返回对象的内容，大概率返回对象内部的数据是undefined。比如说，我下面这样写的话，
//    *  我就确保不了返回的对象中banners和comments是否存在数据，因为axios.get是异步操作
//    *  我不能够确保存在值后返回相应的对象。 
//    *
//    * 
//    */

//   let bannersData = null;
//   let commentsData = null;

//   axios.get('http://localhost:3000/get_list').then((res) => {
//     const { banners, comments } = res.data.data;
//     bannersData = banners;
//     commentsData = comments;
//   });

//   return {
//     type,
//     pyload: {
//       banners: bannersData,
//       comments: commentsData
//     }
//   }
// }



/**
 * 解决的方法也很简单，我能不能返回一个函数呢？当这个函数执行后，获取到相应的数据后，
 * 我在拿到数据之后，直接通过dispatch去触发某些行为。
 * 
 */
export const createFetchHomeData = ({
  type
}) => {
  // 返回一个函数，让外面的dispatch方法可以接受一个函数
  // 然后我返回的这个函数接收的参数最好可以有dispatch、getState供我使用
  // 但是你想要dispatch方法能够接受一个函数，那么需要安装redux-thunk中间件
  return (dispatch, getState) => {
    axios.get('http://localhost:3000/get_list').then(res => {
      const { banners, comments } = res.data.data;
      dispatch({
        type, pyload: {
          banners,
          comments
        }
      });
    })
  }
}