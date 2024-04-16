


购物车的案例


React脚手架解析：
  create-react-app
React脚手架创建项目：
  1. npm install create-react-app -g
  2. create-react-app --version
  3. npx create-react-app 项目名称（名称不允许包含大写字母）
  4. 进入项目，将项目跑动起来
  5. react-scripts webpack的配置
React脚手架目录分析：


了解PWA：
  PWA全称：Progressive Web App，即渐进式WEB应用
  一个PWA应用首先是一个网页，可以通过Web技术编写出一个网页应用
  随后添加上App Manifest 和 Service Worker来实现PWA的安装和离线等功能
  这种Web存在的形式，我们也称之为是Web APP；
PWA解决了那些问题呢？
1.可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
2.实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
3.实现了消息推送
4.等等一系列类似于Native APP相关功能


React脚手架中的webpack配置：
查看webpack配置源码的方式
  1. webpack源码在react-script依赖中存放。
  2. npm run eject 操作是不可逆的