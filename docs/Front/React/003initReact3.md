# React探索之props

## 认识props

* 1.props是父组件传递给子组件的参数
* 2.props是只读性的
* 3.props可以通过父组件传递给子组件自身的state的更新函数，然后子组件调用该更新函数实现子组件更新父组件数据
* 4.也可以实现一个类似vue中的事件系统，子组件调用emit发出事件并携带参数，父组件监听改事件，接受参数与完成state更新操作。

### 简易事件系统代码：
```js
// eventProxy.js
const eventProxy = {
  onObj: {},
  oneObj: {},
  on: function (key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }

    this.onObj[key].push(fn);
  },
  once: function (key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = [];
    }

    this.oneObj[key].push(fn);
  },
  off: function (key) {
    this.onObj[key] = [];
    this.oneObj[key] = [];
  },
  emit: function () {
    let key, args;
    if (arguments.length === 0) {
      return false;
    }
    key = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));

    if (this.onObj[key] !== undefined &&
      this.onObj[key].length > 0) {
      for (let i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args);
      }
    }
    if (this.oneObj[key] !== undefined &&
      this.oneObj[key].length > 0) {
      for (let i in this.oneObj[key]) {
        this.oneObj[key][i].apply(null, args);
        this.oneObj[key][i] = undefined;
      }
      this.oneObj[key] = [];
    }
  }
};

export default eventProxy;
```
### 使用方法：
```js
import eventProxy from './eventProxy.js'
eventProxy.emit('change','参数');
eventProxy.on('change', (params) => { 
// 执行逻辑
  console.log(params)
})
```