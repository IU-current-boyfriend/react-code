react-redux的使用:
  1.安装react-redux:
    yarn add react-redux
  2.通过store提供的Provider向子组件提供store对象
    import { Provider } from 'react-redux';
    import store from './store';
    <Provider store={ store }>
      <App />
    </Provider>
  3. 将组件和redux链接在一起
    import { connect } from 'react-redux';
    function mapStateToProps(state) {
      return {
        counter: state.counter,
        banner: state.banner,
      }
    }
    // 将state映射到组件内部
    export default connect(mapStateToProps)(About); // connect()返回一个高阶组件；

  4. 将action映射到组件内部
    calcNumber(num, isAdd) {
      if (isAdd) {
        this.props.addNumber(num);
      } else {
        this.props.subNumber(num);
      }
    }
    function mapActionToProps(dispatch) {
      return {
        addNumber(num) {
          dispatch(addNumberAction(num));
        },
        subNumber(num) {
          dispatch(subNumberAction(num));
        }
      }
    }
    export default connect(null, mapActionToProps)(About);

  5.将异步请求的数据保存在store中
    a. 在组件的componentWillMounted生命周期函数中请求数据；
    b. 通过connect将action和组件映射到一起；
    c. 通过dispatch派发事件，调用action将数据保存在store中；
    遇见的问题：
      请求数据的步骤还是在组件内部，本身请求的数据都是需要放到store
当中，能不能在store中操作，将请求到的数据放入到store中；
    d. dispatch({})派发只能传递对象，如果要是派发其它类型，则使用redux-thunk
    解决的方案：redux-thunk

  6. redux-thunk的使用
    a. 安装redux-thunk的安装 yarn add redux-thunk
    b. 增加中间件
      import thunk from 'react-thunk';
      import { applyMiddleware } from 'redux';
      const store = createStore(reducer, applyMiddleware(thunk));
    c. 派发行为
      const mapDispatchToProps = (dispatch) => ({
        fetchHomeMultidata() {
          dispatch(fetchHomeMultidataAction());
        }
      });
      const fetchHomeMultidataAction = () => {
        function foo(dispatch, getState) {
         // 发送网络请求
         axios.get().then(res => {
          const banners = res.data.data.banner.list;
          dispatch(changeBannerAction(bannners));
         });
        }
        return foo;
      }

React测试插件:
  1. redux-devtool（生产环境，是看不到redux的）
    开启redux-devtool:
      github上面看redux-devtools-extension打开的步骤:
      // 生产环境是需要要把window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_去除
        a. const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
        b. const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
        c. 开启代码调用track配置：window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_({track: true})
  2. react-devtool


    7. 创建多个store模块，将我们两个reducer合并在一起；
      import { combineReducers } from 'redux';
      const reducer = combineReducers({
        counter: couterReducer,
        home: homeReducer
      });
      const store = createStore(reducer);

    8. combineReducers实现原理
      function reducer(state = {}, action) {
        // 返回的对象，作为store中的state
        return {
          counter: counterReducer(state.counter, action),
          home: homeReducer(state.home, action)
        }
      };


ReduxToolKit(RTK):
  1. 安装 npm install @reduxjs/toolkit react-redux  
  2. ReduxToolKit的核心api：
    a. configureStore：包装createStore以提供简化的配置选项和良好的
默认值。它可以自动组合你的slice reducer，添加你提供的任何Redux中间件，
redux-thunk默认包含，并启用Redux DevTools Extension.
    b. createSlice：接受reducer函数的对象、切片名称和初始化状态值，并自动
生成切片reducer，并带有相应的actions。
    c. createAsyncThunk：接受一个动作类型字符串和一个返回承诺的函数，
并生成一个pending/fulfilled/rejected基于该承诺分派动作类型thunk；

  createSlice api主要包含如下参数：(createSlice返回值是包含action的对象)
  1. name：用户标记slice的名词
    a. 在之后的redux-devtool中会显示对应的名词
  2. initialState: 初始化值
    a. 第一次初始化的值
  3. reducers: 相当于之前的reducer函数
    a. 对象类型，并且可以添加很多的函数
    b. 函数类似于redux原来reducer的一个case语句
    c. 函数的参数：
      i: 参数一: state
      ii: 参数二: 调用这个action时，传递的action参数；

  const store = configureStore({
    reducer: {
      counter: counterReducer,
      home: homeReducer
    }
  })


使用redux-react链接RTK：
  export const { addNumber, subNumber } = counterSlice.actions;
  export default counterSlice.reducer;



RTK操作异步任务：createAsyncThunk
// 实际上就是action，用的话就在组件里面映射，然后在组件内部调用；
const fetchHomeMultidataAction = createAsyncThunk('fetch/HomeMultidata', async (
  extraInfo, store // 异步任务获取数据的其它写法
) => {
  const data = await axios.get('xxxx');
  // 有三种状态:
  1. pending: action被发出，但是还没有最终的结果；
  2. fulfilled: 获取到最终的结果（成功的状态）；
  3. rejected: 执行过程中有错误或者抛出了异常；
  // 我们可以在extraReducers中监听这些状态:
  extraReducers: {
    [fetchHomeMultidataAction.pending](state, action) {

    },
    [fetchHomeMultidataAction.fulfilled](state, {payload}) {
      state.banners = payload.data.banners.list;
    },
    [fetchHomeMultidataAction.rejected]() {},
  }
});

  extraReducer的另外一种写法:
    extraReducers还可以传入一个函数，函数接受一个builder参数：
    extraReducers: (builder) => {
      builder.addCase(fetchHomeMultidataAction.peding, (state, action) => {
        
      }).addCase(fetchHomeMultidataAction.fulfilled, (state, action) => {

      }).addCase(fetchHomeMultidataAction.rejected, (state, action) => {

      })
    }

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





