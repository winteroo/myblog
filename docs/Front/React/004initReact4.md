# React探索之事件

## 事件处理
**1.react中的事件经过react处理合成而来，所以在调用时有自己的写法，例如onClick、onFocus等**
**2.react中的事件处理函数分为以下几种写法：**
* 1.在调用的地方添加this绑定，此种情况在传参时默认第二个参数是自定义传参，后续参数为react合成时间event

```js
handleClick (params, e) {
  //params: 自定义传参
  // e: react自定义事件参数
}
<button onClick={this.handleClick.bind(this, '我是参数')}>点我试试</button>
```

* 2.利用箭头函数生成匿名函数，在匿名函数中调用事件处理函数，此种情况需要显示的传递事件处理对象
```js
// 需要在箭头函数中接受事件对象e并传递给事件处理函数
<button onClick={(e) => { this.handleClick('我是传参', e); }}>点我试试</button>
```

* 3.在构造函数中为事件处理函数绑定this,这种情况无法传递自定义参数，函数接受的第一个参数就是事件处理对象e
```js
constructor (props) {
  super(props);
  this.handleClick = this.handleClick.bind(this);
}
```

* 4.如果你正在使用实验性的 [public class fields 语法](https://babeljs.io/docs/plugins/transform-class-properties/)，你可以使用 class fields 正确的绑定回调函数：
```js
handleClick = () => {
  console.log('this is:', this);
}
```