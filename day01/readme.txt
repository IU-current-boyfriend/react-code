JSX语法:
  JSX是一种JavaScript的语法扩展（Extesion），也在很多地方称之为JavaScript XML，因为
看起来就是一段XML语法；
  它用于描述我们的UI界面，并且其完成可以和JavaScript融合在一起使用；
  它不同于Vue中的模块语法，你不需要专门学习模块语法中的一些指令；

  为什么React选择了JSX呢？
    React认为渲染逻辑本质上与其他UI逻辑存在内在耦合。
    1. 比如UI需要绑定事件（button、a原生等等）
    2. 比如UI中需要展示数据状态
    3. 比如在某些状态发生改变时，又需要改变UI
  他们之间是密不可分，所以React没有将标记分离到不同的文件中，而是将他们组合到了一起，
这个地方就是组件（Component）；



JSX的书写规范：
  1. JSX的结构中只能有一个根元素，例如<div></div>  <div></div>会报错。
  2. 为了方便阅读，我们通常在JSX结构外面包裹一个（），将整个JSX当做一个整体，实现换行。
  3. JSX中的标签可以是单标签，也可以是双标签。



JSX的使用：
  JSX的注释写法: {/* JSX注释的写法 */}


JSX嵌入变量作为子元素：
情况一：当变量是Number、String、Array类型时，可以直接显示。
情况二：当变量是null、undefined、Boolean类型时，内容为空。
  1.如果希望可以显示null、undefined、Boolean，那么需要转成字符串。
  2.转换的方式有很多，比如toString、和空字符串拼接，string变量等方式。
情况三：Object对象类型不能作为子元素（not valid as a React child）
情况四：可以插入对应的表达式，比如说逻辑运算，三元运算符。
情况五：可以调用方法获取结果，换句话说就是可以执行一个函数，返回的结果。


JSX绑定属性:
  <h2 title={title}>绑定属性</h2>



JSX绑定class动态类:
  为什么是className，而不是class呢？
  因为class是JS关键字，所以为了避免耦合，所以要写成className
  <h2 className={}></h2>
1. 拼接动态类名，通过模版字符串的方式处理
2. 拼接动态类型，通过数组的方式转化为字符串的方式  
3. 第三方库，classnames



JSX动态绑定style样式:
  <h2 style={{color: 'red', fontSize:'30px'}}>哈哈哈</h2>



this绑定的问题：
  很有意思，可以😌总结一下。
  解决this的方式：
  1. 在constructor中处理
  2. 通过bind处理
  3. 通过ES其他版本的语法处理，方法设置为箭头函数


APP组件，就是根组件了，之后就是在根组件上进行延伸其他子组件。

