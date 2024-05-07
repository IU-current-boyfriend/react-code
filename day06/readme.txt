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
