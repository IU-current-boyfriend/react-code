import { memo } from 'react';
// import { useLoaderData, useNavigation } from 'react-router-dom';
import { useLoaderData, useNavigate } from 'react-router-dom';

//Component definition is missing display name 组件少了组件名称，主要是在memo api的回调函数名称问题;
// router的loader属性配置可以和useLoaderData配合使用，useLoaderData hook可以获取到loader属性返回值
// 这个loader属性配置很牛逼，你可以获取到请求时内部的请求信息
export default memo(function Detail() {
  const { banners, id } = useLoaderData();
  const navigate = useNavigate();
  // useNavigation返回当前导航状态，它可以是“idle、submitting、loading”状态
  // const navigation = useNavigation();
  // console.log('navigation: =>', navigation);
  return (
    <div className="detail-component">
      <h1>Detail-component-container</h1>
      <div className="detail-banners">
        <h2>detail banners:</h2>
        {
          banners && banners.map(banner => {
            if (banner.id === Number(id)) return (
              <div key={banner.id}>{banner.name}</div>
            )
          })
        }
      </div>
      <div className="detail-navigate-btns">
        <button onClick={() => navigate(-1)}>BACK TO</button>
        <button onClick={() => navigate(1)}>FORWARD TO</button>
      </div>
    </div>
  );
});

// Detail.displayName = 'Detail';

// export default Detail;