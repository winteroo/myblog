# 000 -- 为子元素添加父id
今天走在上班的路上，突然间想起来了以前面试时的一道算法题，当时由于算法能力其弱无比，现在因为偶尔会刷刷
leetcode，基础算法也算是入了门，今天借路上的时间仔细想了想这道题的解题思路，来到公司便编码验证了一下，下面提供题目、思路和题解
## 题目
::: tip 题目
有一个数组，里面的每个item都是对象，对象存在key为id，可能存在key为children，children是一个数组，同样
他里面得每个item也都是对象，同时也可能存在children，现在要求为每个存在父级的item都添加一个
parentId属性，值为父级的id。
* 实例

```js
let obj = [{
  id: 1,
  children: [{
    id: 2,
    children: [{
      id: 3
    }]
  },{
    id: 4,
    children: [{
      id: 5
    }]
  }]
}]

```
:::

## 解析 <Badge text="解法说明"/>
::: tip 提示
:loud_sound:
这道题，由于obj的深度未知，所以这里我们需要使用递归的思想，在思考，我们在处理每个item时，必须知道
他的父级id是什么，所以，递归函数中需要包含此次处理元素的父级信息。所以这里我们需要实现一个包含父级信息的递归函数
* 考虑当前元素和children都是数组，所以我们需要两个for循环嵌套，遍历此次递归函数的本级和子级
* 同时在遍历子级的时候添加递归，向下遍历
* 在递归中，我们需要为子级添加parentId，所以我们在遍历时，需要判断当前元素的父级是否存在，存在则添加父级id，不存在则不处理
* 由于在处理数据时，我们会更改原数据，所以这里我们将原数据做一次深拷贝，防止意外修改原数据
:::

## 解法源码
```js
/**
 * @param {Array} o 需要替换的变量
 * @return {Array} obj 添加了parentId的数组
 */
function addParentId(o) {
  // 克隆数据
  let cloneObj = JSON.parse(JSON.stringify(o));
  // 递归开始
  let newObj = factoryial(cloneObj, null);

  return newObj;

  function factoryial(obj, parent) {
    for (let i = 0; i < obj.length; i++) {
      // 存在parent，则添加parentid
      if (parent) {
        obj[i].parentId = parent.id;
      }
      if (obj[i].children) {
        for (let j = 0; j < obj[i].children.length; j++) {
          // 递归当前元素的子级
          factoryial(obj[i].children, obj[i]);
        }
      }
    } 
    return obj;
  }
}

```