# 队列

## 基本概念

::: tip
* 队列是遵循**先进先出** （**FIFO**）原则的一组有序的项。

* 队列在尾部添加新元素，并从顶部移除元素

* 最新的元素必须排在队列的末尾
:::

## 代码实现

```js
class Queue {
  constructor() {
    this.queue = [];
  }

  // 向队列尾部添加元素
  enqueue (el) {
    this.queue.push(el);
    return this.queue;
  }

  // 移除队列的第一项
  dequeue () {
    return this.queue.shift();
  }

  // 返回队列的第一个元素
  peek () {
    return this.queue[0];
  }

  // 判断队列是否为空
  isEmpty () {
    return this.queue.length === 0;
  }

  // 返回队列的大小
  size () {
    return this.queue.length;
  }
}
```