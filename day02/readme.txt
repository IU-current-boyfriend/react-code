React事件绑定:
  1. React事件的命名采用小驼峰式（camelCase），而不是纯小写;
  2. 我们需要通过{}传入一个事件处理函数，这个函数会在事件发生时被执行;

React中this的绑定问题：
  1. 如果直接在事件处理函数内部打印this，则为undefined。
  为什么会是undefined呢？

  解决this绑定的方式：
  1. bind绑定
  2. ES6 class fileds
  3. 事件监听时传入箭头函数
  4. 在constructor中处理


React事件处理函数中的参数问题：
  事件处理函数内部默认传递event事件对象，event对象
被react进行了包装，event并不是原生的事件对象，而是react封装
的复合对象。

1. event参数的传递方式
  <button onClick={ this.btnClick.bind(this)}></button>

2. event参数的传递方式
  <button onClick={ (event) => this.btnClick(event) }></button>



React事件处理函数传递额外的参数：
  方式一：
    event参数被放到参数列表最后：
    <button onClick={ this.btnClick.bind(this, name, age, event)}></button>
  方式二：
    ()=>{}函数放在组件上，这种形式有问题，会重新执行组件。但是也是可以解决的，可以
使用useCallback hook解决，嘿嘿。
     <button onClick={ (event) => this.btnClick(event, name, age) }></button>


  
React条件渲染：
  在React中，所有的条件判断和普通的JavaScript代码一致；

常见的条件渲染有哪些呢？
1. 最普通的if判断
2. 三元运算符
3. 逻辑与运算符&&，当某一个值有可能为undefined时，使用&&进行条件判断



React列表渲染：
1. 但是React的JSX正是因为和JavaScript无缝衔接，让它可以更加灵活。



JSX的转换过程：
  render函数返回的JSX元素，Babel将会进行转换。每遇到一个标签，
都会被createElement()进行转换创建出虚拟的DOM树，然后虚拟DOM会被
转换为真实DOM树。

实际上，JSX仅仅只是React.createElement()函数的语法糖。
  1. 所有的jsx最终都会被转换成React.createElement函数的调用
createElement需要传递三个参数：
参数一：type
  1. 当前ReactElement的类型；
  2. 如果是标签元素，那么就使用字符串表示div；
  3. 如果是组件元素，那么就直接使用组件的名称；
参数二：config
  1. 所有jsx中的属性都在config中以对象的属性和值的形式存储；
  2. 比如传入className作为元素的class；
参数三：children
  1. 存放在标签中的内容，以children数组的方式进行存储；
  2. 当然，如果是多个元素呢？React内部有对它们进行处理；

我们通过React.createElement最终创建出来一个ReactElement对象：
  这个ReactElement对象是什么作用呢？React为什么要创建它呢？
  1. 原因是React利用ReactElement对象组成了一个JavaScript对象树；
  2. JavaScript的对象树就是虚拟DOM（Virtual DOM）;

虚拟DOM的作用：
1. 在DOM更新的时候能够减少不必要的更新（diff算法）。
2. 虚拟DOM本质是js对象，并没有渲染到界面上，React将
虚拟DOM转换为真实DOM，将真实DOM挂载到界面上。
React可以将虚拟DOM转换为控件，可以开发IOS/Android
端（跨平台开发）。
3.虚拟DOM帮助我们从命令式编程转换为声明式编程的模式
  a. 虚拟DOM是一种编程理念，在这个理念中，UI以一种理想化或者
说虚拟化的方式保存在内存中，并且它是一个相对简单的JavaScript对象；
  b. 我们可以通过root.render()让虚拟DOM和真实DOM同步起来，这个
过程中叫做协调（Reconciliation）;

这种编程的方式赋予了React声明式的API：
1. 你需要告诉React希望让UI是什么状态；
2. React来确保DOM和这些状态是匹配的；
3. 你不需要直接进行DOM操作，就可以从手动更改DOM、属性操作、事件处理中解放出来；


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