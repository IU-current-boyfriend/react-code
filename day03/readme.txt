
  Context应用场景：
    非父子组件数据的共享：
    1. 在开发中，比较常见的数据传递方式是通过props属性自上而下（由父到子）进行传递。
    2. 但是对于有一些场景：比如一些数据需要在多个组件中进行共享。
    3. 如果我们在顶层的App中定义的这些信息，之后一层层传递下去，那么对于一些中间层不需要的
数据的组件来说，是一种沉余的东西。
    组件传递props属性时，平铺属性：{ ...propsData }
  

  如果在React中，层级很多的话，一层层传递是非常麻烦的，并且代码是非常沉余的：
    1. React提供了一个API
    2. Context提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递props；
    3. Context设计的目的是为了共享那些对于一个组件树而言是“全局”的数据；

  Context使用方式:
  方式一：（类组件也行）
    1. 创建context上下文：const ThemeContext = React.createContext('ThemeContext');
    2. ThemeContext.Provider包裹组件，利用value属性给子组件提供值
    3. (注意：子组件中可以通过this.context访问到上下文, 组件名称.contextType = ThemeContext的方式确定使用到的上下文,
    只是在组件中使用单个上下文)
  方式二：（函数式组件，类组件也行）
    1. 创建context上下文：const ThemeContext = React.createContext('ThemeContext');
    2. ThemeContext.Provider包裹组件，利用value属性给子组件提供值;
    3. ThemeContext.Consumer包裹子组件中的JSX元素，进行消费提供者提供的值，内部是函数形式;
  
  共享多个Context上下文：
    <UserContext.Provider>
      <ThemeContext.Provider></ThemeContext.Provider>
    </UserContext.Provider>
  子组件是类组件，想使用多个context上下文：
    可以使用Context.Consumer进行消费数据，这就不像contentType只能设置单一的上下文。

  Context总结：
  1. React.createContext
    a. 创建一个需要共享的Context对象；
    b. 如果一个组件订阅了Context，那么这个组件会从离自身最近的那个匹配
的Provider中读取到当前的context值；
    c. defaultValue是组件在顶层查找过程中没有找到对应的Provider，那么
就使用默认值；
  2. Context.Provider
    a. 每个Context对象都会返回一个Provider React组件，它允许消费组件
订阅的context的变化；
    b. Provider接收一个value属性，传递给消费组件；
    c. 一个Provider可以和多个消费组件有对应关系；
    d. 多个Provider也可以嵌套使用，里层的会覆盖外层的数据；
    e. 当Provider的value值发生变化时，它内部的所有消费组件都会重新渲染；
  3. Class.contextType
    a. 挂载在class上的contextType属性会被重新赋值为一个由React.createContext
创建的Context对象;
    b. 这能让你使用this.context来消费最近Context上的那个值;
    c. 你可以在任何生命周期中访问到它，包括render函数中;
  4. Context.Consumer
    a. 这里，React组件也可以订阅到context变更，这能让你在函数式组件中完成订阅context；
    b. 这里需要函数做为子元素(function as child)这种做法；
    c. 这个函数接受当前的context值，返回一个React节点；
  什么时候用到Context.Consumer呢?
    a. 当使用value的组件是一个函数式组件时;
    b. 当组件中需要使用多个Context时;

  什么时候会用到defaultValue呢？
    <UserContext.Provider></UserContext.Provider>
    <Profile />
    Profile组件没有作为UserContext的JSX子组件，但是Profile组件内部
通过contentType设置了某个context。此时可以在创建createContext的时候，
传入默认值createContext('defaultValue')。