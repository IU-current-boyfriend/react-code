const {
  createRoot
} = ReactDOM;

const root = createRoot(document.getElementById('app'));

/**
 * 它这个现象是比较有意思的：
 *    为什么说有意思呢？因为它这个改变了状态，按照vue来说，将会重新渲染视图。
 * 但是React这样做并不会重新渲染视图。其本质很简单，为什么React当状态改变的时候，
 * 视图没有更新呢？你会发现message只是个变量，你点击按钮之后，只是改变了message
 * 变量这个值，跟视图渲染并没有什么关系。而对于Vue来说，它底层是有封装响应式数据的，
 * 所以当状态发生变化的时候，能够驱动视图更新。它是怎么封装的呢？你可以看到对于ref来说，
 * 它通过.value的方式去修改状态，.value和message的区别就大了，一个是对象中的属性，
 * 一个是单纯的变量值。什么意思呢？也就是说，当我对象发生变化的时候，我就驱动视图更新，
 * 而单纯的变量值被重新赋值，做不到驱动视图更新。再说，就是单纯的变量是没有办法驱动
 * 视图的更新，我们没有办法知道变量是否被重新赋值了，如果是对象的话，就不同，我们可以
 * 通过数据劫持、代理等方式得知对象是否发生变化。
 * 
 * 
 */

let message = 'hello world';

function btnClick() {
  message = 'hello react';
  renderComponent();
}


// root.render((
//   <div className="warpper">
//     <h2>{message}</h2>
//     <button onClick={btnClick}>修改文本</button>
//   </div>
// ));

renderComponent();



// =>>>>> 解决方案：
function renderComponent() {
  root.render((
    <div className="warpper">
      <h2>{message}</h2>
      <button onClick={btnClick}>修改文本</button>
    </div>
  ));
}