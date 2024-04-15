React中的事件总线EventBus:(非父子组件传递)
  1. 安装第三方库 hy-event-store
  2. eventBus.on('eventName', () => {});监听触发的事件
  3. eventBus.emit('eventName', () => {}); 触发事件
  4. eventBus.off('eventName', () => {});移除事件
事件总线的源码（研究一下思路）:
https://github.com/coderwhy/hy-event-store


setState用法（关键）:
  （总结）：
  Vue对数据管理和界面渲染的流程解析，
  React对数据管理和界面渲染的流程解析，对Vue和React对比。

为什么使用setState：
  开发中我们并不能直接通过修改state的值来让界面发生更新：
  1. 因为我们修改了state之后，希望React最新的state来重新渲染
界面，但是这种方式的修改React并不知道数据发生了什么变化；
  2. React并没有实现类似于Vue2中的Object.defineProperty或者
Vue3中的Proxy的方式来监听数据的变化;
  3. 我们必须通过setState来告知React数据已经发生了变化；


setState的用法：
  1. 基本使用，更新数据不是直接替换，而是在浅层覆盖，类似Object.assign(this.state, newState);
    this.setState({
      message: 'xxx'
    });

  2. setState可以传入回调函数
    好处：
      a. 可以在回调函数中编写新的state的逻辑
      b. 当前的回调函数会将之前的state和props传递进来(任务队列先进先出,取任务的时候，就表示回调函数执行的结果，
      在点击事件中，多次调用setState，结果是递增的场景)
    this.setState((prevState, prevProps) => {
      return {
        message: ""
      };
    });

  3. setState在React的事件处理中是一个异步调用
  this.setState({
    message: 'new'
  });
  console.log('message: =>', this.state.message); // old
  如果希望在数据更新之后（数据合并），获取到对应的结果执行一些逻辑，那么可以
在setState中传入第二个参数：callback；
  this.setState(xxx, () => {
    console.log('+++++: =>', this.state.message); // 最新的值
  });


为什么setState设计成异步调用呢？
  首先setState是异步的操作，我们并不能在setState之后立即拿到最新的
state的结果。
  1. setState设计为异步，可以显著的提升性能；
    a. 如果每次调用setState都进行一次更新，那么意味着render函数会被频繁调用，界面
重新渲染，这样效率是很低的；
    b. 最好的办法应该是获取到多个更新，之后进行批量更新；（不会直接调用render函数，把这些任务
放到队列queue中，先进先出的特点，栈是先进后出 ）
  2. 如果同步更新了state，但是还没有执行render函数，那么组件中state和props不能保持同步
    a. state和props不能保持一致性，会在开发中产生很多问题（同步更新state的话，父组件中的state已经进行了更新，
但还没有执行render函数，而子组件中的props已经保存着之前的数据，所以导致数据不一致）；
 

setState一定是异步的吗？（React18之前）
1. 在setTimeout中的更新
  在React18之前，setTimeout/setState操作，是同步操作；
  在React18之后，setTimeout/setState操作，是异步操作（批处理）；
  setTimeout(() => {
    this.setState({ message: 'new' });
    console.log('this.state :=>', this.state.message);
  }, 0);

2. 原生的DOM事件,为什么是同步的呢？因为这些回调函数不是交由react处理，
而是由浏览器进行处理（react18之前）。
  componentDidMount() {
    const btnEl = document.getElementById('btn');
    btnEl.addEventListener('click', () => {
      this.setState({
        message: '你好，李颖河'
      });
    })
  }

setState默认是异步的（React18之后）：
  在React18之后，默认所有的操作都被放到了批处理中（异步处理）；
（对应着备忘录中的第二张图）
如果你不想使用批处理，我就想同步的拿到更新的数据，此时可以使用：
  import { flushSync } from 'react-dom';
  setTimeout(() => {
    flushSync(() => {
      this.setState({ message: 'new' });
      this.setState({ message: 'new' });
    });
    console.log('能直接拿到最新的值');
  }, 0);



React性能优化SCU:
1. React中的diff算法进行了哪些优化呢？
  a. 如果一棵树参考另外一棵树进行完全比较更新，那么即使是最先进的算法，该算法
的复杂程序为O(n^2)，其中n是树中元素的数量;(这种算法是跨节点层级比较的，不是同级比较)

  b. 如果在React中使用了该算法，那么展示1000个元素所需要执行的计算量将在十亿的量级范围；

  c. 这个开销太过昂贵了，React的更新性能变得非常低效；

2. 于是，React对这个算法进行了优化，将其优化成了O(n),如何优化的呢？
  a. 同层节点之间相互比较，不会垮节点比较；
  b. 不同类型的节点，产生不同的树结构；
  c. 开发中，可以通过key来执行哪些节点在不同的渲染下保持稳定；
  （key的作用：比如说，有个列表，我在列表之前插入一个新的列表，
diff算法将会进行同级比较；比如更新之前，列表顺序是abcde，插入完成之后，列表顺序是abfcde；
React并不会因为插入一个f元素，从而去更新后面的cde元素，因为cde元素并没有发生改变，React会
最大程度的复用这些未变化的节点，通过key标识来指定这些节点在渲染的时候最大程度保持复用的稳定性。）


keys的优化：
  我们在前面遍历列表时，总是会提示一个警告，让我们加入一个key属性：
方式一：在最后位置插入数据
  a. 这种情况，有无key意义并不大；
方式二：在前面插入数据
  a. 这种做法，在没有key的情况下，所有的li都需要进行修改
方式三：当子元素（这里的li）拥有key时，React使用key来匹配原有树上的子元素以及最新树上的子元素：
  a. 在下面这种场景下，key为111和222的元素仅仅进行位移，不需要进行任何的修改；
  b. 将key为333的元素插入到最前面的位置即可；
key的注意事项：
  a. key应该是唯一的
  b. key不要使用随机数（随机数在下一次render时，会重新生成一个数字）；
  c. 使用index作为key，对性能没有优化的；



遇见的问题：
1. APP => render => 子组件Home/Recommend => render();
(也就是说，APP某些状态发生改变，render函数重新调用执行，但是导致子组件无论是否依赖
APP的状态，都会重新执行自己的render函数，并且渲染)；

我们的预期: 状态如果修改的值相同，则不需要调用render函数；子组件没有依赖父组件的状态，
父组件状态发生变化时，子组件不需要重新调用render函数；

解决的方法：使用shouldComponentUpdate（简写：SCU）
  参数1: nextProps修改之后，最新的props属性
  参数2: nextState修改之后，最新的state属性
该方法返回值是一个boolean类型：
  a. 返回值为true，那么就需要调用render方法；
  b. 返回值为false，那么就不需要调用render方法；
  c. 默认返回的是true，也就是只要state发生变化，就会调用render方法；


PureComponent纯组件:（如果组件是类组件）
  如果所有的类，我们都需要手动来实现shouldComponentUpdate，那么会给我们开发者增加非常多的工作量.
  a. 我们来设想一下shouldComponentUpdate中的各种判断目的是什么？
  b. props或者state中的数据是否发生了变化，来决定shouldComponentUpdate返回true或者false；
  React已经提供了PureComponent的特性：
    PureComponent底层比较使用的是"浅比较"（暂定）;


memo和效果和PureComponent类似，只是针对于函数组件：
memo本质上是高阶组件：
const Profile = memo(() => return (<div></div>));


shallowEqual()比较的源码：浅层比较，PureComponent底层的shallowEqual实现


ref获取DOM的操作:
  在React的开发模式中，通常情况下不需要，也不建议直接操作DOM原生，但是某些特殊的
情况，确实需要获取到DOM进行操作：
1. 管理焦点，文本选择或媒体播放；
2. 触发强制动画；
3. 集成第三方DOM库；
4. 我们可以通过refs获取DOM
  获取DOM真实节点多种方式：
  1. 在React元素上绑定一个ref字符串(被废弃)
    a. 在真实DOM上绑定ref属性
    b. 通过this.refs.xxx获取
  2. createRef api创建ref对象
    a. this.titleRef = createRef();
    b. 在真实DOM节点上绑定ref={this.titleRef}属性;
    c. 可以在this.titleRef.current中获取到DOM真实节点;
  3. 传入一个回调函数，在对应的元素被渲染之后，回调函数执行，并且将元素传入
    a. 在真实DOM节点上绑定ref={(el) => {console.log(el)}};
    b. 声明变量this.titleRef = null;
    c. 给变量赋值ref={(el) => {this.titleRef = el}};


ref的转发：
在前面我们学习ref时讲过，ref不能应用于函数式组件：
  1. 因为函数式组件没有实例，所以不能获取到对应的组件对象；
但是，在开发中我们可能想要获取函数式组件中某个元素的DOM，这个时候我们应该如何操作呢？
  1. 直接传入ref属性（错误的做法）
  2. 通过forwardRef高阶函数；（我们想要获取函数组件中的某个元素）
  const HelloWord = forwardRef(function(props, ref) {
    return (
      <div>
        <h1 ref={ref}>Home</h1>
        <button>按钮</button>
      </div>
    );
  });


