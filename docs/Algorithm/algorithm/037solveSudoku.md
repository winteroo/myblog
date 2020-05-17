# 037 -- 解数独

## 题目
::: tip 题目
一个数独的解法需遵循如下规则：

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
空白格用 '.' 表示。

* 示例1
```js
输入:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: 数独的解
[
  ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
  ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
  ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
  ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
  ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
  ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
  ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
  ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
  ["3", "4", "5", "2", "8", "6", "1", "7", "9"]
]
```
:::

## 解析 <Badge text="解法说明"/>
::: tip 提示
:loud_sound:
利用回溯算法来解决数独问题
:::

## 回溯算法
回溯算法，实际上就是一个决策树的遍历过程。顾名思义，回溯就是在不满足当前条件时，回退到上一个节点继续验证下一个可能解，直至所有的
你只需要思考 3 个问题：

* 1、路径：也就是已经做出的选择。

* 2、选择列表：也就是你当前可以做的选择。

* 3、结束条件：也就是到达决策树底层，无法再做选择的条件。

**回溯算法伪代码如下：[重要]**
```js
let result = [];
function backtrack (路径, 选择, ...args) {
  if (满足条件) {
    result.push(路径)
    return
  }
  for (循环选择项) {
    做出选择;
    backtrack(路径,选择, ...args);
    撤销选择;
  }
}
```
回溯算法经典的题目是全排列和n皇后问题，下面分析全排列问题。
全排列，就是列举出给定数组的全部排列方式，
例如：
```js
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```
套用回溯框架题解源码如下：
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let result = [];
  let tempList = [];
  backtrack(result, tempList, nums);
  return result;
};
// 回溯算法
function backtrack(result, tempList, nums) {
  // 得到一个结果
  if (tempList.length === nums.length) {
    return result.push([...tempList]);
  }
  // 回溯条件
  for (let i = 0; i < nums.length; i++) {
    // 筛选回溯条件
    if (tempList.indexOf(nums[i]) > -1) continue;
    // 做出回溯选择
    tempList.push(nums[i]);
    // 回溯
    backtrack(result, tempList, nums);
    // 不符合条件，撤销选择
    tempList.pop();
  }
}

```

## 题解源码
数独求解提供两种解法，解法1在寻找到第一个满足的解时就会返回，而解法二会求解全部的数独解，将全部的解存在res中。

需要注意回溯停止条件和筛选符合条件的元素

### 解法1
```js
/**
 * @description 寻找到了第一个解即返回
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  backtrack(board, 0, 0);
  return board;

  function backtrack(board, i, j) {
    let m = 9,
      n = 9;
    if (i === m) {
      return true;
    }
    if (j === n) {
      return backtrack(board, i + 1, 0)
    }
    if (board[i][j] !== '.') {
      return backtrack(board, i, j + 1);
    }
    for (let k = 1; k <= 9; k++) {
      if (!isValid(board, i, j, k.toString())) continue;

      board[i][j] = k.toString();
      if (backtrack(board, i, j + 1)) {
        return true;
      }
      board[i][j] = '.'
    }
    return false;
  }

  function isValid(board, i, j, str) {
    for (let k = 0; k < 9; k++) {
      // 判断横行没有重复
      if (board[i][k] === str) return false;
      if (board[k][j] === str) return false;
      if (
        board[
          Math.floor(i / 3) * 3 + Math.floor(k / 3)
        ][
          Math.floor(j / 3) * 3 + k % 3
        ] === str
      ) {
        return false
      };
    }
    return true;
  }
};
```
### 解法2
```js
/**
 * @description 利用标准回溯算法
 * @param {character[][]} board
 * @return {void}
 */
var solveSudokuElse = function (board) {
  let res = [];
  backtrack(board, 0, 0);
  return res;

  function backtrack(board, i, j) {
    let m = 9,
      n = 9;
    // 说明已经找到一个解，将解压入结果中
    if (i === m) {
      return res.push(board);
    }
    // 说明一行已经找到解，进行下一行
    if (j === n) {
      backtrack(extend(board), i + 1, 0)
      return;
    }
    // 跳过已经填写了数字的位置
    if (board[i][j] !== '.') {
      backtrack(extend(board), i, j + 1);
      return;
    }
    // 标准回溯算法
    for (let k = 1; k <= 9; k++) {
      // 不符合条件的筛掉
      if (!isValid(board, i, j, k.toString())) continue;
      board[i][j] = k.toString();
      backtrack(extend(board), i, j + 1)
      board[i][j] = '.'
    }
  }
  // 深拷贝
  function extend(source) {
    let target = null;
    if (typeof source === 'object') {
      target = Array.isArray(source) ? [] : {}
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          if (typeof source[key] !== 'object') {
            target[key] = source[key]
          } else {
            target[key] = extend(source[key])
          }
        }
      }
    } else {
      target = source
    }
    return target
  }

  function isValid(board, i, j, str) {
    for (let k = 0; k < 9; k++) {
      // 判断横行没有重复
      if (board[i][k] === str) return false;
      if (board[k][j] === str) return false;
      if (
        board[
          Math.floor(i / 3) * 3 + Math.floor(k / 3)
        ][
          Math.floor(j / 3) * 3 + k % 3
        ] === str
      ) {
        return false
      };
    }
    return true;
  }
};
```