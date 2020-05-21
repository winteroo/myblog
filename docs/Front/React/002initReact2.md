# React探索之state

## 探索state和setState

关于state和setState有以下几点注意：

### 1.调用setState方法来修改state的值
```js
this.setState({ obj: 'new' })
```
### 2.state的更新会被合并
对于如下的state数据，调用setState只会更新obj1的数据，然后合并obj2的数据返回新的state
```js
this.state = {
  obj1: 1,
  obj2: 'str'
}
// 此处会只更新obj1的数据，然后合并obj2的数据返回新的state
this.setState({ obj1: 2 })
```
### 3.setState的更新是异步的
```js
this.state = {
  bb: 1
}
this.setState((preState, preProps) => {
  return {
    bb: preState.bb + 1
  };
});
console.log(this.state.bb); // 此处打印出来的值为1
```
因为setState的更新是异步的，所以先执行打印逻辑，后执行修改数据的逻辑，故打印的是1，如需解决上述问题：
* 1.可使用async await 修饰符
```js
async changeState () {
  await this.setState((preState, preProps) => {
    return {
      bb: preState.bb + 1
    };
  });
  console.log(this.state.bb); // 此处打印为2
}
```
* 2.使用setState的回调函数，数据更新完成后会调用callback
```js
this.setState((preState, preProps) => {
  return {
    bb: preState.bb + 1
  };
},() => {
  console.log(this.state.bb); // 此处打印出来的值为2
});
```
* 3.在生命周期componentDidUpdate 中执行所需逻辑