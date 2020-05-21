# JS的继承

js的6种继承模式

## 原型链继承
**核心： 将父类的实例作为子类的原型**
```js
// 父类
function Animal(name) {
  this.name = name || 'animal';
  this.features = ['sleep', 'eat'];
  this.sleep = function () {
    console.log('sleep');
  }
}

Animal.prototype.eat = function (food) {
  console.log(this.name + ' eat: ' + food);
}
```

```js{7,19,21}
function Cat() {
  this.miao = function () {
    console.log('miao~');
  }
}

Cat.prototype = new Animal('cat'); // 继承关键

let cat = new Cat();
let tom = new Cat();

console.log(cat.name); // cat
cat.sleep(); // sleep
cat.eat('fish'); // cat eat: fish
cat.miao(); // miao~
cat.features.push('miao');
cat.name = 'catcat';

console.log(cat.features, cat.name); // ["sleep", "eat", "miao"] "catcat"

console.log(tom.features, tom.name); // ["sleep", "eat", "miao"] "cat"
```
**特点：**
* 1.非常纯粹的继承关系，实例是子类的实例，也是父类的实例
* 2.父类新增原型方法/原型属性，子类都能访问到
* 3.简单，易于实现

**缺点：**
* 1.要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中
* 2.无法实现多继承
* **3.来自原型对象的所有属性被所有实例共享，引用类型的数据发生变化，所有实例均发生变化，值类型的数据则会保持唯一性。**
* **4.创建子类实例时，无法向父类构造函数传参**

## 构造继承

**核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）**
```js{2,13}
function Cat(name) {
  Animal.call(this, name);
  this.miao = function () {
    console.log('miao~');
  }
}

let tom = new Cat('tom');
let cat = new Cat('cat');

console.log(cat.name); // cat
cat.sleep(); // sleep
// cat.eat('fish'); // 无法访问。报错eat为undefined
cat.miao(); // miao~
cat.features.push('miao'); 
cat.name = 'catcat';

console.log(cat.features, cat.name); //  ["sleep", "eat", "miao"] "catcat"

console.log(tom.features, tom.name); // ["sleep", "eat"] "tom"
```

**特点：**
* 1、解决了1中，子类实例共享父类引用属性的问题
* 2、创建子类实例时，可以向父类传递参数
* 3、可以实现多继承（call多个父类对象）
* 4、每个子类实例保持唯一性，子类属性变化不会相互影响

**缺点：**
* 1、实例并不是父类的实例，只是子类的实例
* **2、只能继承父类的实例属性和方法，不能继承原型属性/方法**
* 3、无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

## 实例继承
**核心：为父类实例添加新特性，作为子类实例返回**
```js{2,6}
function Cat(name) {
  let instance = new Animal(name);
  instance.miao = function () {
    console.log('miao~');
  }
  return instance
}

/** 测试 ***/
let tom = new Cat('tom');
let cat = new Cat('cat');

console.log(cat.name); // cat
cat.sleep(); // sleep
cat.eat('fish'); // cat eat: fish
cat.miao(); // miao~
cat.features.push('miao');
cat.name = 'catcat';

console.log(cat.features, cat.name); // ["sleep", "eat", "miao"] "catcat"

console.log(tom.features, tom.name); // ["sleep", "eat"] "tom"

console.log(cat instanceof Animal); // true

console.log(cat instanceof Cat); // false
```
**特点：**
* 1、不限制调用方式，不管是new 子类()还是子类(),返回的对象具有相同的效果

**缺点：**
* 1、实例是父类的实例，不是子类的实例
* 2、不支持多继承

## 拷贝继承
**核心：在子类内实例化父类，并将父类上的属性和方法拷贝到子类的```prototype```上**
```js{3,5,25}
/*** 拷贝继承 ***/
function Cat(name) {
  let animal = new Animal(name);
  for (let key in animal) {
    Cat.prototype[key] = animal[key];
  }
  Cat.prototype.miao = function () {
    console.log('miao~');
  }
}

/** 测试 ***/
let tom = new Cat('tom');
let cat = new Cat('cat');

console.log(cat.name); // cat
cat.sleep(); // sleep
cat.eat('fish'); // cat eat: fish
cat.miao(); // miao~
cat.features.push('miao');
cat.name = 'catcat';

console.log(cat.features, cat.name); //  ["sleep", "eat", "miao"] "catcat"

console.log(tom.features, tom.name); //  ["sleep", "eat", "miao"] "cat"

console.log(cat instanceof Animal); // false

console.log(cat instanceof Cat); // true
```

**特点：**
* 1、支持多继承（可以在内部实例多个父类）

**缺点：**
* 1、效率较低，内存占用高（因为要拷贝父类的属性）
* 2、无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）
* 3、子类内部引用类型会被都有实例共享

## 组合继承
**核心：将原型链继承和构造继承相结合，用另一种及车行方式来弥补一种继承方式的缺点**
```js{3,8}
/*** 组合继承 ***/
function Cat(name) {
  Animal.call(this, name);
  this.miao = function () {
    console.log('miao~');
  }
}
Cat.prototype = new Animal();

/** 测试 ***/
let tom = new Cat('tom');
let cat = new Cat('cat');

console.log(cat.name);// cat
cat.sleep(); // sleep
cat.eat('fish'); // cat eat: fish
cat.miao(); // miao~
cat.features.push('miao');
cat.name = 'catcat';

console.log(cat.features, cat.name); // ["sleep", "eat", "miao"] "catcat"

console.log(tom.features, tom.name); //  ["sleep", "eat"] "tom"

console.log(cat instanceof Animal); // true

console.log(cat instanceof Cat); // true
```
**特点：**
* 1、弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
* 2、既是子类的实例，也是父类的实例
* 3、不存在引用属性共享问题
* 4、可传参
* 5、函数可复用

**缺点：**
* 1、调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

## 寄生组合继承
**核心：利用空函数复制父类的原型，将子类的原型指向该空函数的实例，寄生组合式继承就是一个借用构造函数 + 相当于浅拷贝父类的原型对象**
```js{3,8,9,10,11,12,13}
/*** 寄生组合继承 ***/
function Cat(name) {
  Animal.call(this, name);
  this.miao = function () {
    console.log('miao~');
  }
}
(function () {
  function F () {}
  F.prototype = Animal.prototype;
  Cat.prototype = new F();
  Cat.prototype.constructor = Cat;
})()

/** 测试 ***/
let tom = new Cat('tom');
let cat = new Cat('cat');

console.log(cat.name);// cat
cat.sleep(); // sleep
cat.eat('fish'); // cat eat: fish
cat.miao(); // miao~
cat.features.push('miao');
cat.name = 'catcat';

console.log(cat.features, cat.name); // ["sleep", "eat", "miao"] "catcat"

console.log(tom.features, tom.name); //  ["sleep", "eat"] "tom"

console.log(cat instanceof Animal); // true

console.log(cat instanceof Cat); // true
```
::: tip 改进
```js{8,9}
/*** 寄生组合继承 ***/
function Cat(name) {
  Animal.call(this, name);
  this.miao = function () {
    console.log('miao~');
  }
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
```
这里利用ES5标准的原型继承规范 => ```Object.create()```，其实```Object.create()```只是以下代码的语法糖
```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```
:::