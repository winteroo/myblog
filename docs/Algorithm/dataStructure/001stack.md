# 栈

## 基本概念

::: tip
* 栈是一种遵循**后进先出** （**LIFO**）原则的有序集合。

* 新添加或待删除的元素都保存在栈的同一端，称作栈顶。另一端称作栈底。
:::

## 代码实现

```js
class Stack {
  constructor() {
    this.stack = [];
    this.length = 0;
  }

  // 向栈中添加元素
  push(el) {
    this.stack.push(el);
    this.length++;
    return this.stack;
  }

  // 弹出栈顶元素
  pop() {
    let item = this.stack.pop();
    if (this.stack.length > 0) {
      this.length--;
    }
    return item;
  }

  // 返回栈顶元素
  peek() {
    return this.stack[this.length - 1];
  }

  // 栈是否为空
  isEmpty() {
    return this.length === 0;
  }

  // 清空栈
  clear() {
    this.stack = [];
    this.length = 0;
  }

  // 栈大小
  size() {
    return this.length;
  }
}
```
