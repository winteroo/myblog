# 原型和原型链

原型和原型链在js的学习中是比较重要也是比较难理解的部分，本文就这个难点和大家探讨我对于原型和
原型链的理解。

## 普通对象和函数对象

在JavaScript世界中，所有的东西都是对象，但是对象和对象之间也是有区别的，下面我们就区分一下
普通对象和函数对象。

```js
function f1(){};
var f2 = function(){};
var f3 = new function(){};
 
var o1 = {};
var o2 = new Object();
var o3 = new f1();
 
console.log(typeof Object); //function
console.log(typeof Function);//function
console.log(typeof f1) //function
console.log(typeof f2) // function
console.log(typeof f3) //function
console.log(typeof o1) //object
console.log(typeof o2) //object
console.log(typeof o3)// object
```
上面的代码可以看出，f1、f2和f3都是函数对象，而o1，o2和o3都是object对象，也就是普通对象，
函数对象本质就是由```new Function()```构造而来，其他的都是普通对象；

## 原型

* 每个javascript对象在被创建时都会关联另一个对象，这个对象就是原型。
* 在JavaScript中，原型也是一个对象，原型的作用，则是实现对象的继承。

::: tip 说明
**1、函数对象和普通对象的一个重要区别就是函数对象有```prototype```属性，用于查看该函数对象的原型，称为显式原型，而普通对象没有该属性。**
**2、但是目前浏览器厂商为普通对象实现了```__proto__```属性，该属性指向实例对象的构造函数的原型。称为隐式原型（标准实现方法为```Object.getPrototypeOf(p)```）**
:::

具体实例：

```js
// 构造方法
function Person () {}
// 原型
Person.prototype
// 实例
let person = new Person()
// 验证
person.__proto__ === Person.prototype // true
```

## 原型链

* 除开Object的prototype的原型是null以外，所有的对象和原型都有自己的原型，对象的原型指向原型对象。

* 在层级多的关系中，多个原型层层相连则构成了原型链。

* 在查找一个对象的属性时，倘若在当前对象找不到该属性，则会沿着原型链一直往上查找，直到找到为止，如果到了原型链顶端，还没找到，则返回undefined。

* 所有对象原型链最终都会到```Object.prototype```，而javascript为了避免原型链的死循环，规定```Object.prototype```的原型是null，即到达原型链的末端。

* 1.函数的原型
```js
// 构造方法
function Person () {}
// 原型方法
Person.prototype.name = 'man';
// 实例化
let person = new Person();
// 继承原型方法
person.name  // 'man'
// 验证
person.__proto__ === Person.prototype // true
```
从上述代码中提炼出来的原型继承图如下：
![proto](~@Front/JS/image/proto2.png)

* 2.构造方法```constructor```

```js
Person === Person.prototype.constructor // true
```
![proto](~@Front/JS/image/proto3.png)

* 3.继续延长至```Object```
```js
Person.prototype.__proto__ === Object.prototype // true
```

![proto](~@Front/JS/image/proto4.png)

* 4.到达原型链的末端```null```

```js
Object.prototype.__proto__ === null // true
```

![proto](~@Front/JS/image/proto5.png)


