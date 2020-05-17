# 004 -- JS事件循环(Event Loop)

## 为什么JavaScript是单线程
JavaScript语言的一大特点就是**单线程**，即同一时间内，JavaScript只能做一件事。

其实，JavaScript的单线程特点和它的用途是有关系的，试想，如果JavaScript是多线程的，此时有两个线程，一个线程修改
某个DOM元素的内容，有一个线程又去删除这个DOM，那么这时浏览器就不知道该怎么办了，造成不必要的混淆。

所以，为了避免复杂，JavaScript做成单线程语言，这样就很清晰了。

## 任务队列
因为JavaScript的单线程机制，这就意味着所有的任务都必须排队执行，前一个任务执行完成，后一个任务才会执行，如果此时
队列中有一个非常耗时的操作，后一个任务就不得不持续等待。

但是JavaScript设计者不会允许这样的事情发生，所以JavaScript会将异步事件挂在与当前执行栈不同的队列中，这个队列我们称之为**任务队列**。
::: tip 执行栈
JavaScript主线程执行时，会从执行栈顶取出一个任务执行，执行完后再取任务执行，周而复始。
:::

## 任务分类
在JavaScript中，我们将全部的任务分为两种：同步任务和异步任务。

异步任务又分为**宏任务**和**微任务**
* 宏任务(macrotask):一些异步任务的回调函数会依次进入宏任务队列（macro task queue），这些异步任务包括：
    * **setTimeout**
    * **setInterval**
    * **setImmediate (Node独有)**
    * **requestAnimationFrame (浏览器独有)**
    * **I/O**
    * **UI rendering (浏览器独有)**
* 微任务（microtask）：另一些异步任务的回调函数会依次进入宏任务队列（micro task queue）,包括:
    * process.nextTick (Node独有)
    * Promise.then
    * Object.observe
    * MutationObserver

## Event Loop
先来看一张图：
![eventLoop](~@Front/JS/image/eventLoop.png)

***
这张图将浏览器的event loop完整的流程描述了出来，具体如下：

1. 执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout等）；
2. 全局Script代码执行完毕后，调用栈Stack会清空；
3. 从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1；
4. 继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。注意，如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行；
5. microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；
6. 取出宏队列macrotask queue中位于队首的任务，放入Stack中执行；
7. 执行完毕后，调用栈Stack为空；
8. 重复第3-7个步骤；

......
***

## 面试题详解
题目：
```js
setTimeout(function () {
    console.log(1);
});
new Promise(function(resolve,reject){
    console.log(2)
    resolve(3)
}).then(function(val){
    console.log(val);
})
console.log(4);
```
:::tip 分析
1. 执行script
2. 第一行遇到setTimeout，宏任务，放到宏任务队列中，继续执行
3. 第4行遇到promise，promise里面的任务是同步任务，是立即执行的，所以打印2，并执行resolve
4. 第七行，遇到then，微任务，放到微任务队列中，继续执行
5. 第十行，遇到打印语句，同步任务，直接执行打印4，
6. 此时，执行栈空了，JavaScript开始从微任务队列中依次取出微任务压入执行栈中执行，打印3
7. 微任务队列空了，JavaScript开始从宏任务队列中依次取出宏任务压入执行栈中执行，打印1.
所以最终结果是2，4，3，1
:::

**如果你感觉本文章对你有帮助，欢迎 [Star](https://github.com/winteroo/myblog)**


