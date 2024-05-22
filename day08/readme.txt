（好重要）React-Router中的路由：

  1. 安装react-router-dom
  2. react-router最主要的API是提供给我们一些组件：
    a. BrowserRouter或HashRouter
        Router中包含了对路径改变的监听，并且将相应的路径传递给子组件；
        BrowserRouter使用history模式
        HashRouter使用hash模式

    b. 添加路由的映射配置表
      Routes：包裹所有的Route，在其中匹配一个路由
      Router5.x使用的是Switch组件
    在组件中配置：
      <Routes>
        Router5:
        <Route path="/home" component={} />
        Router6:
        <Route path="/home" element={<Home />} />
      </Routes>
    Route组件的配置：Route用于路径的匹配：
      path属性：用于设置匹配到的路径
      element属性：设置匹配到路径后，渲染的组件
        Router5.x:使用的是component属性
      exact属性：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件；
        Router6x:不再支持该属性

  3. 路由配置和跳转
    a. Link和NavLink组件
      通常路径的跳转是使用Link组件，最终会被渲染成a元素。
      NavLink是在Link基础之上增加了一些样式属性。
      to属性：Link中最重要的属性，用于设置跳转到的路径。
      <Link to="/home">首页</Link>

    b. Link组件的其他属性：
      replace: boolean (与push操作的区别，push可以会退，replace操作不能回退，因为是替换操作)
      state
      reloadDocument：跳转完路径，需不需要重新加载页面boolean

    c. NavLink组件
      事实上在默认匹配成功时，NavLink就会添加上一个动态的active class。
      NavLink组件会在被选中的路由元素上添加class="active"类名。
        <NavLink to="/home"></NavLink>
      NavLink组件可以直接传入style属性,传入的参数形式是函数形式,为什么是函数形式呢？
      因为它要给你返回一些参数使用，所有只能是函数形式。
        <NavLink to="/home" style={({isActive}) => ({color: 'red'})}></NavLink>
      当然也可以动态添加className：
        <NavLink to="/home" className={(isActive) => ({color: 'red'})}></NavLink>

  4. Navigate导航
      Navigate用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中：
      案例：
        用户跳转到Profile里面；
        但是在Profile洁面有一个isLogin用于记录用户是否登录：
          true：那么显示用户的名称；
          false：直接重定向到登录界面；
        { isLogin ? <button>登录</button> : <Navigate to="/home" /> }

  5. NotFound页面配置
    / *任意通配符 /
    vue中: /:pathMatch(.*) 任意字符出现0次或者多次/
      <Route path="*" elememt={<NotFound />} />

  6. 路由的嵌套
    <Route path="/" element={<Home />}>
      <Route path="/home/recommend" element={<Recommend />} />
    </Route>
    <Link to="/home/recommend"></Link>
    // 标记组件需要显示的位置，占位组件
    <Outlet />

  
  7. 手动路由跳转
    import { useNavigate } from 'react-router-dom';

    useNavigate是hooks的形式，所以不能在类组件中使用。

    const navigate = useNavigate();

    navigate()参数配置：
      1. to：跳转的路由路径
      2. options：{ replace: boolean, state }
         replace替换操作
      3. delta: number -1表示返回 1表示进一个

    如果类组件使用useNavigate，必须要使用高阶组件封装拦截：
通过高阶组件然后给容器组件传递navigate对象，然后再交给组件使用。



  8. 路由参数传递
  动态路由方式一：
    <Route path="/detail/:id" element={<Detail />} />
  获取动态传递的参数：
    import { useParams } from 'react-router-dom';
    useParams很显然是hooks，所以只能放到函数组件中使用,如果想在
类组件中使用useParams，那么就需要像useNavigate一样封装高阶组件。

  动态路由方式二：
    <Link to="/user?name=cong&age=18"></Link>
    获取参数方式1:
      const location = useLocation();
    获取参数方式2:（这个对象获取方式有点特别，必须要使用get方法）
      const [params, setParams] = useSearchParams();
      params.get('name');
      params.get('age');
      // 将上面的对象转为普通对象
      const query = Object.fromEntries(params);

  9. 路由配置文件
    所有的路由配置在App文件中，就会显得代码很多很杂，能否直接将路由
配置抽离出来。
  // 创建路由配置信息
    const routes = [
      {
        path: "/",
        element: <Navigate to="/home" />
      },
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: '/home',
            element: <Navigate to="/home/recommend" />
          },
          {
            path: '/home/recommend',
            element: <HomeRecommend />
          },
          {
            path: '/home/ranking',
            element: <HomeRanking />
          }
        ]
      }
    ]
  // 注入路由的配置信息
    <div>{ useRoutes(routes) }</div>

  10. 路由的懒加载，打包的时候可以分包处理,npm run build时打包分包（不同的chunk.js文件）处理
    React中提供的技术,目的达到懒加载：
    const About = React.lazy(() => import('../pages/About'));
    const Login = React.lazy(() => import('../pages/Login'));
    <Suspense fallback={<h3>Loading</h3>}>
      <App />
    </Suspense>


  11. React Hooks解析:
    案例：点击按钮改变页面状态
      函数式组件存在的最大缺陷：
    1. 组件不会被重新渲染：修改message之后，组件知道自己要重新进行渲染吗？
    2. 如果页面重新渲染：函数会被重新执行，第二次重新执行，依然会被初始化为message原本的值。
    3. 类似于生命周期函数的回调，函数式组件没有。

      class组件对于函数式组件有什么优势？
    1. class组件可以定义自己的state，用来保存组件自己内部的状态；
      a. 函数式组件不可以，因为函数每次调用都会产生新的临时变量；
    
    2. class组件有自己的生命周期，我们可以在对应的生命周期中完成自己的逻辑：
      a. 比如在componentDidMount中发送网络请求，并且该生命周期函数只会执行一次；
      b. 函数式组件在学习hooks之前，如果在函数中发送网络请求，意味着每次渲染都会重新发送一次网络请求；

    3. class组件可以在状态改变时只会重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate等；
      a. 函数式组件在重新渲染时，整个函数都会被执行，似乎没有什么地方可以只让它们调用一次；

    
      class组件存在的问题：
    1. 随着业务的增多，我们的class组件会变得越来越复杂；
    2. componentDidMount中，可能就会包含大量的逻辑代码；包括网络请求、一些事件的监听（还需要在
    componentWillUnMount中移除）
    3. class组件的逻辑非常难抽离。
    4. this的指向有一定难度。


      Hooks的使用场景：
    1. Hooks的出现基本可以代替我们之前所有使用class组件的地方；
    2. 但是如果是一个旧的项目，你并不需要直接将所有的代码重构为Hooks，
因为它完全向下兼容，你可以渐进性的使用它；
    3. Hook只能在函数组件中使用，不能在类组件，或者函数组件之外的地方使用；
    4. Hook不能在普通函数中使用，但是可以在你的自定义hook中使用，如果你想告诉react
某些函数是自定义hook，你可以将hook命名为use开头。


Hooks中的useState解析：
  1. useState来自react，需要从react中导入，它是一个hook;
    参数：初始化值，如果不设置为undefined；
    返回值：数组，包含两个元素；
      元素一：当前状态的值（第一调用为初始化值）
      元素二：设置状态值的函数
  2. 点击button按钮后，会完成两件事情
    调用setCount，设置一个新的值；
    组件重新渲染，并且根据新的值返回DOM结构；



Effect Hook的解析：
  副作用：side effect
  1. effect hook可以让你来完成一些类似于class中生命周期的功能；
  2. 事实上，类似网络请求、手动更新DOM、一些事件的监听，都是React更新DOM的一些副作用
  3. 所以对于完成这些功能的Hook被称之为Effect Hook；


需要清除Effect：
  在class组件的编写过程中，某些副作用的代码，我们需要在componentWillUnMount中进行清除：
  1. 比如我们之前的事件总线或Redux中手动调用subscribe；
  2. 都需要在componentWillUnMount有对应的取消订阅；
  3. Effect Hook通过什么方式来模拟componentWillUnMount呢？
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {

    });
    
    // 返回值：清除effect副作用回调函数 => 组件被重新渲染或者组件卸载的时候执行；
    return () => {

    }
  })


Effect性能优化：Hooks笔记总结过了，就是传递不同的依赖性




useContext：
  1. 类组件可以通过类名.contextType = MyContext方式，在类中获取context;
  2. 多个Context或者在函数式组件中通过MyContext.Consumer方式共享context;
const user = useContext(UseContext);
<h2>user: { user.name }</h2>
注意事项：
  当组件上层最近的MyContext.Provider提供的数据更新时，该Hook会触发重新渲染，并使用
最新传递给MyContext.Provider的context value值。



useReducer：coderwhy里面没有什么变动，参考react hooks笔记就行。



useCallback：
  闭包陷阱，为什么页面没有更新呢？
  const App = memo(() => {
    const [ count, setCount ] = useState(0);

    const increment = useCallback(() => {
      console.log('increment');
      setCount(count + 1);
    });

    return (
      <div className="warpper">
        <h2>计数: {count}</h2>
        <button onClick={increment}></button>
      </div>
    )
  });

  解决方式：
    通过useRef，useRef在组件多次渲染时，返回的是同一个值；
    const currentRef = useRef();
    currentRef.current = count;
    useCallback(() => {
      setCount(currentRef.current + 1);
    })

  useCallback的价值就是react hooks笔记中在子组件用的价值。


useMemo hooks 优化：给子组件传递对象的时候遇见的问题


useRef hooks：
  useRef返回一个ref对象，返回的ref对象在组件的整个生命周期保持不变；
  用法一：
    const titleRef = useRef();
    <h2 ref={titleRef}>Hello World</h2>
    <button onClick={() => titleRef.current}></button>

  useRef的特点：组件调用多少次，useRef返回的都是同一个对象。此特点可以解决闭包
陷阱的问题；



useImperativeHandle hooks：
  forwardRef: => 之前转发ref元素对象;
  const HelloWorld = memo(forwardRef((props, ref) => {
    return <input type="text" ref={ref} />
  }));

  应用场景：父组件获取到子组件中的元素，但是对于元素进行操作的权限
有很多，但是子组件只想让父组件获取到部分权限，类似于Vue中的expose。

  在子组件里面对父组件传入的ref进行处理：
  返回的对象就是ref元素中的current属性值；
   useImperativeHandle(ref, () => {
    return {
      focus: () {
        console.log('focus');
      }
    }
   });


useLayoutEffect:
  1. useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新；
  2. useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新；

  // 界面会闪琐的现象，原因在于页面已经挂载了值，不满意，你再次修改；
  useEffect(() => {
    console.log('useEffect');
    if (count === 0) {
      setCount(Math.random() + 99);
    }
  });
  // 解决方式：利用useLayoutEffect修改




自定义Hook:
  自定义Hook本质上只是一种函数代码逻辑的抽取，
严格意义上来讲，它本身并不算React的特性：

const useLogLife = () => {
  ...自定义Hook内容
};


自定义Hook的context共享案例（本质上就是逻辑抽取）；
  



redux hooks：类组件是没有办法使用hook的，类组件还是需要使用connect函数
  这两个hook的目的就是为了代替connect函数的使用
  useSelector的作用是将state映射到组件中：
    参数一：将state映射到需要的数据中；
    参数二：可以进行比较来决定是否组件重新渲染；

  useSelector默认会比较我们返回的两个对象是否相等：
    1. 如何比较呢？const refEquality = (a, b) => a === b;
    2. 也就是我们必须返回两个完全相等的对象才可以不引起重新渲染;
    3. useSelector((state) => {}, shallowEqual);
    4. shallowEqual会对比当前state对象和修改后的state对象，只有两个对象不完全相等的时候，才会重新渲染。


  useDispatch非常简单，就是直接获取dispatch函数；


  import { useSelector } from 'react-redux';

  // 获取redux中的值
    const state = useSelector((state) => {
      return {
        count: state.counter.count
      }
    });

  // 派发redux中的任务
    const dispatch = useDispatch();
    dispatch(addNumberAction(num));

  
  useSelector默认监听state，如果state发生改变的话，将会导致组件
重新渲染，这个逻辑是不对的，这个地方是需要进行优化性能的。


  首屏渲染的速度：为什么首屏渲染慢呢？
    SPA页面，因为当你在浏览器中输入域名之后，因为它要
请求一个index.html文件。获取到index.html文件之后，浏览器要解析index.html文件，
当解析到script脚本的代码时，将会下载js文件，并且执行他。但是呢，有些JS文件是非常消耗
时间的，所以我们对于首屏渲染来说是比较慢的。而SSR服务端渲染是直接在服务器端组装完index.html文件。获取到index
的内容之后，直接返回index.html文件，所以客户端下载完之后index.html，就可以呈现index.html中的
所有内容。所以，相比于SSR来说，SPA的首屏渲染将会慢于SSR的方式。

  同构应用：
    1. 一套代码即可以在服务端运行又可以在客户端运行，这就是同构应用；
    2. 同构是一种SSR的形态，是现代SSR的一种表现形式。
      a. 当用户发出请求时，先在服务器通过SSR渲染出首页的内容；
      b. 但是对应的代码同样可以在客户端被执行；
      c. 执行的目的包括事件绑定等以及其它页面切换时也可以在客户端被渲染；
    3. 同构应用实际上就是生成一个app.js文件，这个app.js文件作为服务端入口和
客户端入口，通过webpack打包之后，交由服务端和客户端进行处理。
 
  hydrate：
    本质上是同构的一个过程，在进行SSR时，我们的页面会呈现为HTML,
但仅HTML不足以使页面具有交互性。例如，浏览器端javascript为零的页面
不能是交互的（没有JavaScript事件处理程序来响应用户的操作，例如单击按钮）。
    为了使我们的页面具有交互性，除了在Node.js中将页面呈现为HTML之外，我们的UI框架
还在浏览器中加载和呈现页面。（它创建页面的内部表示，然后将内部表示映射到我们在Node.js中呈现的HTML
的DOM元素）。


useId： useId是一个用于生成横跨服务端和客户端的翁丁的唯一ID的同时避免hydration不匹配的hook。
  1. useId是用于react的同构应用开发的，前端的SPA页面并不需要使用它；
  2. useId可以保证应用程序在客户端和服务器端生成唯一的ID，这样可以有效的
避免通过一些手段生成的id不一致，造成hydration mismatch;




useTransition:
  useTransition: 它其实在告诉React对于某部分任务的更新优先级比较低，可以稍后进行更新；
  案例：关键字搜索的过滤操作，当数据多的时候，我删除关键字，下面过滤的信息展示很慢。
    但是我们的需求是，删除的优先级高，但是过滤展示的优点低。我们可以使用useTransition来
对优先级低的操作进行稍后更新；

  const [pending, setTransition] = useTransition();
  setTransition(() => {
    // 关键字过滤操作
  });


useDeferredValue：
  效果和useTransition类似；
  useDeferredValue接受一个值，并返回该值的新副本，该副本将推迟到更紧急地推迟更新；
  const deferedShowNames = useDeferredValue(showNames);
  
1609
















































































