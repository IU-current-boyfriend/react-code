StrictMode严格模式：(StrictMode是一个用来突出显示应用程序中潜在问题的工具)
1. 与Fragment一样，StrictMode不会渲染任何可见的UI
2. 它为其后代元素触发额外的检查和警告
3. 严格模式检查仅在开发模式下运行；它们不会影响生产构建；

严格模式检查的是什么？
1. 识别不安全的生命周期；
2. 使用过时的ref api创建ref对象
3. 检查意外的副作用
  a. 这个组件的constructor调用两次
  b. 这时严格模式下故意进行的操作，让你来查看在这里写的一些逻辑代码被调用多次时，是否会产生一些副作用；
  c. 在生产环境下，是不会被调用两次的
4. 使用findDOMNode api将会提出警告，功能找到组件的根元素；可以使用ref代替
5. 检测过时的context API
  a. 早期的Context是通过static属性声明Context对象属性，通过getChildContext返回
Context对象等方式来使用Context的；



React过渡动画实现：
  在开发中，我们想要给一个组件的显示和消失添加某种过度动画，可以很好的增加用户体验。
  react-transition-group第三方库，方便我们实现组件的入场和离场动画，使用时需要进行额外的安装：
  1. yarn add react-transition-group

react-transition-group包含的主要组件：
  1. transition
    a. 该组件是一个和平台无关的组件（不一定要结合CSS）
    b. 在前端开发中，我们一般是结合CSS来完成样式，所以比较常用的是CSSTransition
  2. CSSTransition
    a. 在前端开发中，通常使用CSSTransition来完成过渡动画效果
  3. SwitchTransition
    a. 两个组件显示和隐藏切换时，使用该组件
  4. TransitionGroup
    a. 将多个动画组件包裹在其中，一般用于列表中元素的动画
  
显示与隐藏的案例：
  timeout是必须传递的属性
  unmountOnExit是必须传递的属性，表示动画退出之后需要卸载组件
  <CSSTransition 
    in={boolean} 
    classNames="animation"
    timeout={2000}
    unmountOnExit={true}  
  >
    <h2>需要显示的内容</h2>
  </CSSTransition>

CSSTransition执行过程中，有三个状态：appear,enter,exit：
它们有三种状态，需要定义对应的CSS样式：
  1.第一类，开始状态：对应的类是-appear、-enter、exit;
  2.第二类，执行动画：对应的类是-appear-active、-enter-active、-exit-active;
  3.第三类，执行结束：对应的类是-appear-done、-enter-done、-exit-done;

CSSTransition常见对应的属性：
in：触发进入或者退出状态
  1. 如果添加了unmountOnExit={true}，那么组件会在执行退出动画结束后被移除掉；
  2. 当in为true时，触发进入状态，会添加-enter、-enter-active的class开始执行
动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class；
  3. 当in为false时，触发退出状态，会添加-exit、-exit-active的class开始执行
动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class；

classNames：动画class的名称
  1.决定了在编写css时，对应的class名称，比如：card-enter、card-enter-active、card-enter-done

timeout：过渡动画的时间

appear：
  1. 是否在初次进入添加动画（需要和in同时为true）

unmountOnExit: 退出后卸载组件


CSSTransition对应的钩子函数：主要为了检测动画的执行过程，来完成一些JavaScript的操作
  1. onEnter: 在进入动画之前被触发；
  2. onEntering: 在应用进入动画时被触发；
  3. onEntered: 在应用进入动画结束后被触发；
  4. onExit: 在离开动画之前被触发；
  5. onExiting: 在离开动画时被触发；
  6. onExited: 在离开动画后被触发；

小技巧：
  因为CSSTransition组件在实现的时候，源码使用到了过时的
api，如果React开启严格模式的话，将会抛出警告。抛出警告的原因
在于，用到了findDOMNode api。
  我们可以给CSSTransition组件设置nodeRef={this.sectionRef}属性，然后通过
this.sectionRef = createRef()创建ref对象，给需要动画的节点绑定ref属性。这样的话
CSSTransition组件在做动画的时候，就会去找我们设置的节点。


SwitchTransition动画：
  SwitchTransition可以完成两个组件之间切换的炫酷动画：
  1. 比如我们有一个按钮需要在on和off之间切换，我们希望看到on从左侧退出，off再从右侧进入；
  2. 这个动画在vue中被称之为vue transition modes；
  3. react-transition-group中使用SwitchTransition来实现动画；
  <SwitchTransition 
    mode="out-in"
  >
    <CSSTransition
      key={isLogin ? 'exit' : 'login'}
      className="login"
      timeout={1000}
    >
      <div>需要显示的内容</div>
    </CSSTransition>
  </SwitchTransition>

SwitchTransition组件的属性：mode，有两个值
  1. in-out：表示新组件先进入，旧组件再移除；
  2. out-in：表示旧组件先移除，新组件再进入；
如何使用SwitchTransition呢？
  1. SwitchTransition组件里面要有CSSTransition或者Transition组件，不能直接包裹你想要切换的组件；
  2. SwitchTransition里面的CSSTransition或者Transition组件不再像以前那样接受in属性来判断
元素是何种状态，取而代之的是key属性；


TransitionGroup动画：
  当我们有一组动画时，需要将这些CSSTransition放入到一个TransitionGroup来完成动画。
<TransitionGroup
  component="ul"
>
   <CSSTransition
      key={index}
      className="book"
      timeout={1000}
    >
      <li>需要显示的内容</li>
    </CSSTransition>
</TransitionGroup>