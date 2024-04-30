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