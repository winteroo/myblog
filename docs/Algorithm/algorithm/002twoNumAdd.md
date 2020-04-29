# 002 -- 两数相加

## 题目
::: tip 题目
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
* 示例
```js
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```
:::

## 解析 <Badge text="解法说明"/>
::: tip 提示
:loud_sound:
待更
:::

## 创建链表源码
```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function LinkedList() {
  this.length = 0;
  this.head = null;
  this.push = push;
}

const push = function (el) {
  const node = new ListNode(el);
  let current = null;
  if (this.head == null) {
    this.head = node;
  } else {
    current = this.head;
    while (current.next != null) {
      current = current.next;
    }
    current.next = node;
  }
  this.length++;
}

let nodeList1 = new LinkedList();
let nodeList2 = new LinkedList();

let arr1 = [2, 3, 4];
let arr2 = [5, 6, 4];

for (let i = 0; i < arr1.length; i++) {
  nodeList1.push(arr1[i]);
}

for (let i = 0; i < arr2.length; i++) {
  nodeList2.push(arr2[i]);
}
```

## 题解源码
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @description 两数相加，链表相加
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const addTwoNumbers = function (l1, l2) {
  let result = new ListNode(null);
  let nextRst = result;
  // 进位
  let params = 0 // 传给下一个层级的值
  let val = 0 // 传给当前层级的值

  while (l1 != null || l2 != null) {
    // TODO
    let x = (l1 != null) ? l1.val : 0;
    let y = (l2 != null) ? l2.val : 0;

    val = (x + y + params) % 10;
    params = Math.floor((x + y + params) / 10);

    nextRst.next = new ListNode(val)
    nextRst = nextRst.next

    if (l1 != null) l1 = l1.next
    if (l2 != null) l2 = l2.next

  }

  if (params) {
    nextRst.next = new ListNode(params)
  }

  return result.next
};

```