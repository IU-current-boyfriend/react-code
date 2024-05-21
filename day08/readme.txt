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
  
1598











































































