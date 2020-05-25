# bind函数
bind函数是非常常见的绑定函数作用域的方法，那bind都有哪些特性，又是如何实现的呢？下面我们就来探索一下。
## bind函数的特性
测试函数
```js
function myTest () {
  console.log(this.a);
}
myTest.prototype.walk = function () {
  console.log('walk');
}
```
### 为函数绑定作用域
```js
let obj = {
  a: 30
}
let c = myTest.bind(obj);
c(); // 30
```
这里，我们为函数```myTest```绑定作用域为```obj```，所以输出的```this.a```是```obj.a```为30；

### 函数柯里化
修改源函数为接受一个参数的函数，并执行打印。
```js
function myTest (arg) {
  console.log(this.a);
  console.log(arg);
}
```
```js
let obj = {
  a: 30
}
let c = myTest.bind(obj);
c(10); // 30 10

let d = myTest.bind(obj, 10)(); // 30 10
```
bind绑定之后的函数，具备了函数柯里化的特性。

### 对new无效
```js
let obj = {
  a: 30
}
let c = myTest.bind(obj);

c(); // 30

let cc = new c(); // undefined
cc.walk(); // walk

let d = new myTest(); // undefined
d.walk(); // walk
```
上面的代码结果，我们发现，```new```操作符修饰后的绑定函数和未绑定函数的表现是一样的，由此可以得出
```bind```函数对```new```操作是无效的。

## 实现bind函数
* ```bind```方法是函数方法特有的属性，所以```bind```是定义在```Function.prototype```上的；
* ```bind```方法返回的是一个函数；
* ```bind```方法的函数参数是可传递的；
```js
Function.prototype.bind = function () {
  // 数组方法
  let slice = Array.prototype.slice;
  
  let fn = this;

  let args = arguments;
  // 绑定的作用域
  let context = args[0];
  // 剩余参数
  let restArgs = slice.call(args, 1);

  let fun = function () {
    // 组合bing参数
    let allArgs = restArgs.concat(slice.call(arguments));
    // 返回原函数在context作用域下的执行结果
    return fn.apply(context, allArgs);
  }

  return fun;
}
```
执行上述的函数测试，我们可以发现，我们实现的```bind```函数对```new```操作符是有效的，但是无法访问原函数
原型链上的属性和方法。
```js
let obj = {
  a: 30
}
let c = myTest.bind(obj);

let cc = new c(); // 30
cc.walk(); // 报错
```
![bind](~@Front/JS/image/bindTest.png)
所以，我们需要对```new```操作符做特殊处理:
* **1、在调用函数执行时，检查是否是```new```操作符创造的实例，如果是，则将作用域设置为```this```**
* **2、修正返回函数的原型为原函数逇原型**
```js{17,20}
Function.prototype.bind = function () {

  let slice = Array.prototype.slice;

  let fn = this;

  let args = arguments;

  let context = args[0];

  let restArgs = slice.call(args, 1);

  let fun = function () {

    let allArgs = restArgs.concat(slice.call(arguments));

    return fn.apply(this instanceof fun ? this : context, allArgs);
  }

  fun.prototype = Object.create(this.prototype);

  return fun;
}
```
测试：
```js
let obj = {
  a: 30
}
let c = myTest.bind(obj);

c();

let cc = new c();
cc.walk();

let d = new myTest();
d.walk();
```
![bind](~@Front/JS/image/rightBindTest.png)

## 官方bind函数实现
```js
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};
```