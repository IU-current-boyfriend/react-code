React中如何编写CSS:
1. React中CSS的概述
2. 内联样式CSS写法
3. 普通CSS文件写法
4. CSS Module写法
5. CSS in JS解决方案
6. classNames库使用


子组件化中选择合适的CSS解决方案应该符合以下条件：
1. 可以编写局部css：css具备自己的具备作用域，不会随意污染其他组件内的元素；
2. 可以编写动态css：可以获取当前组件的一些状态，根据状态的变化生成不同的css样式；
3. 支持所有的css特性：伪类、动画、媒体查询等；
4. 编写起来简洁方便、更好符合一贯的css风格特点；


内联样式：
  内联样式是官方推荐的一种css样式的写法。
  1. style接受一个采用小驼峰命名属性的JavaScript对象，而不是CSS字符串；
  2. 并且可以引用state中的状态来设置相关的样式；
  render() {
    const title = this.state;
    <div style={{color: title}}></div>
  }
  优点：
    1. 内联样式，样式之间不会有冲突；
    2. 可以动态获取当前state中的状态；
  缺点：
    1. 写法上都需要使用驼峰标识；
    2. 某些样式没有提示；
    3. 大量的样式，代码混乱；
    4. 某些样式无法编写（比如伪类/伪元素）


普通的CSS方案：
  普通的css我们通常会编写到一个单独的文件，之后再进行引入。
  import './App.css';
  这样的编写方式和普通的网页开发中编写方式是一致的：
    1. 如果我们按照普通的网页标准去编写，那么也不会有太大的问题；
    2. 但是组件化开发中我们总是希望组件是一个独立的模块，即便是样式也只是在自己内部生效，不会互相影响；
    3. 但是普通的css都属于全局的css，样式之间会互相影响；
  这种编写方式最大的问题是样式之间会互相层叠掉；


CSS Modules：
  css modules并不是React特有的解决方案，而是所有使用了类似于webpack配置的环境下都可以使用的。
    1. 如果在其他项目中使用它，那么我们需要自己来进行配置，比如配置webpack.config.js中的modules: true等；
  React的脚手架已经内置了css modules的配置：
    1. .css/.less/.scss等样式文件都需要修改成.module.css/.module.less/.modules.scss等;
    2. 之后就可以引用并且进行使用了；
  React脚手架创建的项目已经自动配置好webpack，无需我们手动配置；
  使用方式：
    1. import appStyle from './App.module.css';
    2. <h2 className={appStyle.title}></h2>
  优点：
    1. css modules确实解决了局部作用域的问题，也是很多人喜欢在React中使用的一种方案；
  缺点：  
    1. 引用的类名，不能使用连接符（.home-title），在JavaScript中是不是别的；
    2. 所有的className都必须使用{style.className}的形式来编写；
    3. 不方便动态来修改某些样式，依然需要使用内联样式的方式；


CSS in JS解决方案:
  1. CSS-in-JS是一种模式，其中CSS由JavaScript生成而不是外部文件中定义；
  2. 注意此功能并不是React的一部分，而是由第三方库提供；
  3. React对样式如何定义并没有明确态度；
  在传统的前端开发中，我们通常会将结构（HTML）、样式（CSS）、逻辑（JavaScript）进行分离
  优点：
    1. 但是在前面的学习中，我们就提及过，React的思想中认为逻辑本身和UI是无法分离的，所以才会有JSX的语法；
    2. 样式呢？样式也属于UI的一部分；
    3. 事实上CSS-in-JS的模式是一种将样式（css）也写入到JavaScript中的方式，并且可以方便的使用JavaScript的状态；
    4. 所以React又被人称之为All in JS；
  缺点：
  当然，这种开发的方式也受到很多人的评判；


第三方库：styled-components：
  1. CSS-in-JS通过JavaScript来为CSS赋予一些能力，包括类似于CSS预处理器一样的样式嵌套、函数定义、逻辑复用、动态修改状态等等；
  2. 虽然CSS与处理器也具备某些能力，但是获取动态状态依然是一个不好处理的点；
  3. 所以，目前可以说CSS-in-JS是React编写CSS最为受欢迎的一种解决方案；
目前比较流行的CSS-in-JS的库有哪些呢？
  1. styled-components
  2. emotion
  3. glamorous

1. 安装styled-components:
  npm install styled-components

  ES6：标签模版字符串使用
  function foo(...args) {
    console.log(args);
  }
  foo(1, 2, 3);
  // 模版字符串调用函数
  foo`my name is ${name}, age is ${age}`; => ['my name is', 'age is', ['why', '18']]

2. import styled from 'styled-components';
  // styled.div``返回一个组件，其实本质就是div;
  export const AppWrapper = styled.div`
    .sectiion {}
    .footer {}
  `;
  import { AppWrapper } from './style.js';
  <AppWrapper></AppWrapper>

3. vscode官方插件安装vscode-styled-components


styled-components基本使用特性：
  styled-components的本质是通过函数的调用，最终创建出一个组件：
    1. 这个组件会被自动添加上一个不重复的class；
    2. styled-components会给该class添加相关的样式；
  另外，它支持类似于CSS与处理器一样的样式嵌套：
    1. 支持直接子代选择器或者后代选择器，并且直接编写样式；
    2. 可以通过&符号获取当前元素；
    3. 直接伪类选择器、伪元素等；

styled-components高级特性：
  1. 子元素单独抽取到一个样式组件；
  2. 动态接受外部的传入的props,可以动态修改样式；
  3. 可以通过attrs给标签模版字符串中提供的属性
  <sectionWrapper size={size}></sectionWrapper>
  (attrs是设置默认值样式一)
  export const sectionWrapper = styled.div.attrs(props => {
    return {
      tColor: props.color || 'blue',
    }
  })`
    .title {
      font-size: ${ props => props.size }px;
      color: ${ props => props.tColor }px;
    }
  `;
  (attrs是设置默认值样式二)
  export const sectionWrapper = styled.div.attrs(props => ({
    tColor: props.color || 'blue'
  }))`
    .title {
      font-size: ${ props => props.size }px;
      color: ${ props => props.tColor }px;
    }
  `;
  4. 定义变量、使用变量,定义variable.js文件
    export const primaryColor = '#ff8800';
    export const secondColor = '#ff7788';
    export const smallSize = '12px';
    export const largeSize = '18px';
    import * as vars from './style/varibles';
    export const SectionWrapper = styled.div`
      .section {
        color: primaryColor;
      }
    `;
  5. ThemeProvider给子组件提供样式,子组件共享样式
      import { ThemeProvider } from 'styled-components';
      <ThemeProvider theme={{color: 'purple'}}>
        <App />
      </ThemeProvider>
    创建style.js文件
      import styled from 'style-components';
      export const HomeWrapper = styled.div`
        .header {
          color: ${ props => props.theme.color }
        }
      `; 
  6. 样式的继承
  export const HyButtonWrapper = styled(HomeWrapper)``;


React中动态的添加classname:
  使用classname的库,安装classname的包:
    npm install classnames
  使用方式可以去github上看：
    classNames('foo', { bar: true, duck: false }, 'baz', { quux: true });




Redux的使用详解一:
  副作用概念的理解：
    1. 副作用（side effect）其实本身是医学的一个概念，比如我们
经常说吃什么药本来是为了治病，可能会产生一些其它的副作用；
    2. 在计算科学中，也引用了副作用的概念，表示在执行一个函数时，除了返回函数值
之外，还对调用函数产生了附加的影响，比如修改了全局变量，修改参数或者改变外部的存储；


为什么需要redux:
  1. JavaScript需要管理的状态越来越多，越来越复杂
  2. 这些状态包括服务器返回的数据、缓存数据、用户操作产生的数据等等，
也包括一些UI的状态，比如某些元素是否被选中，是否显示加载动效，当前分页；

管理不断变化的state是非常困难的：
  1. 状态之间相互会存在依赖，一个状态的变化会引起另一个状态的变化，view页面也有可能引起状态的变化；
  2. 当应用程序复杂时，state在什么时候，因为什么原因而发生了变化，发生了怎么样的变化，会变得非常难以控制和追踪；

React是在视图层帮助我们解决了DOM的渲染过程，但是state依然是留给我们自己来管理：
  1. 无论是组件定义自己的state，还是组件之间的通信通过props传递；也包括通过Context进行数据之间的共享；
  2. React主要负责帮助我们管理视图，state如何维护最终还是我们来决定；


Redux的核心理念:
  store:
  action:
    1. 所有数据的变化，必须通过派发(dispatch) action来更新;
    2. action是一个JavaScript普通的对象，用来描述这次更新的type和content;
    比如下面就是几个更新friends的action:
      1. 强制使用action的好处是可以清晰的知道数据到底发生了什么样的变化，所有的数据变化都是可追、可预测的；
      2. 当然，目前我们的action是固定的对象；
      3. 真实应用中，我们会通过函数来定义，返回一个action;
      const action1 = { type: 'ADD_FRIEND', info: {name: 'lucy', age: 20}}
      const action2 = { type: 'INC_AGE', index: 0 }
      const action3 = { type: 'CHANGE_NAME', pyload: { index: 0, newName: 'coderwhy' }}
  reducer:
    1. reducer是一个纯函数；
    2. reducer做的事情就是将传入的state和action结合起来生成一个新的state；

redux使用方式：
  1. createStore创建store对象
  2. reducer函数接受state和action参数，返回值会作为store之后存储的state
  3. 订阅, 当store内部数据发生改变时，将执行回调函数；
    store.subscribe(() => {});
  4. 取消订阅, const cancleSubscribe = store.subscribe(() => {}), cancleSubscribe();
  5. redux项目目录划分：actionCreators、reducer、constants、index

Redux的三大原则:
  1. 单一数据源
    a. 整个应用程序的state被存储在一颗object tree中，并且这个object tree只存储在一个store中；
    b. Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护；
    c. 单一的数据源可以让整个应用程序的state方便维护、追踪、修改；

  2. state是只读的
    a. 唯一修改State的方法一定是触发action，不要试图在其它地方通过任何的方式来修改state；
    b. 这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state；
    c. 这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心race condition(竞态)的问题；
  
  3. 使用纯函数来执行修改
    a. 通过reducer将旧state和actions联系在一起，并且返回一个新的state；
    b. 随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分；
    c. 但是所有的reducer都应该是纯函数，不能产生任何的副作用；


Redux在react中使用: 加减的demo;
