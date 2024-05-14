RTK中的数据不可变性质:
  immutable js：数据不可变
  RTK工具里面可以是使用state.counter = state.counter + 5
这种方式；Redux Toolkit的数据不可变性；
  1. React开发中，我们总是会强调数据的不可变性；
    a. 无论是是类组件中的state，还是redux中管理的state;
    b. 实际上在整个JavaScript编码过程中，数据的不可变性都是非常重要的；
  2. 所以在前面我们经常会进行前拷贝来完成某些操作，实际上浅拷贝也是存在问题的：
    a. 比如过大的对象，进行浅拷贝也会造成性能的浪费；
    b. 比如浅拷贝后的对象，在深层改变时，依然会对之间的对象产生影响；
  3. 事实上Redux Toolkit底层使用了immerjs的一个库来保证数据的不可变性；
  数据的不可变性去看codewhy微信公众号里面的原理；



RTK中的connect函数原理：
  截图了，去看备忘录；


截图中的connect与store的耦合度很大，解除耦合：
(比如，发布到npm的话，"../store"文件夹会有问题)，
通过Provider来处理：
1. 创建context对象
  const StoreContext = createContext();
2. <StoreContext.Provider value={store}></StoreContext>
3. 在组件中的设置：
  component.contentType = StoreContext;
4. 在组件中调用：
  constructor(props, context) {};
  this.context.dispatch();





