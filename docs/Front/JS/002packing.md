# 002 -- JS装箱和拆箱

## 装箱
::: tip 说明
:loud_sound:
在JavaScript里面有个引用类型叫做基本包装类型，它包括String、Number和Boolean。对应的基本数据类型是String、Number和Boolean。
**所谓的装箱，是指将基本数据类型转换为对应的引用类型的操作,而装箱又分为隐式装箱和显式装箱。**
:::
### 1.隐式装箱
```js
let str = 'text';
str.indexOf('e');
```
上面代码的实际执行逻辑为：
- 1、创建String类型的一个实例；
- 2、在实例中调用制定的方法；
- 3、销毁这个实例。
转化为代码为：
```js
let str = new String('test');
str.indexOf('e');
str = null
```
当我们在调用基本数据类型的方法时，js会自动为我们创建于该基本数据类型值相同的包装类型，在包装类型的原型链上有很多可用的方法，js会调用原型链上的方法返回执行结果。
### 2.显示装箱
显示装箱顾名思义就是手动创建包装类型
```js
let str = new String('test')
```
如此创建了该实例对象后，我们就可以显式使用其原型链上的方法，而且由于是我们手动创建的对象，所以他会一直此存在于内存当中，不会被销毁。
## 拆箱
::: tip 说明
:loud_sound:
拆箱就是将引用类型转换为基本数据类型，拆箱的方法有两个valueOf()和toString()，以下为在chrome浏览器中的测试结果。
:::
![chome浏览器测试](~@Front/JS/image/package.png)
