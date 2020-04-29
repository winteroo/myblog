# 034 -- 在排序数组中查找元素的第一个和最后一个位置

## 题目描述
::: tip 题目
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
你的算法时间复杂度必须是 O(log n) 级别。如果数组中不存在目标值，返回 [-1, -1]。
* 示例1
```js
输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
```
* 示例2
```js
输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]
```
:::

## 题目解析 <Badge text="解法说明"/>
::: tip 提示
:loud_sound:
根据题意是寻求目标值在数组中的最左和最右侧的索引值，如果利用js中的indexOf和lastIndexOf方法
可以很轻松得到结果，但是题目中要求时间复杂度为O(logn),很显然，并不符合题意，所以我们很自然的
能想到使用**二分查找**进行算法时间复杂度优化。
* 这里我们需要找到目标值在数组中的最左索引，我们可以通过二分法中当nums[mid] === target 时，
不返回索引值，而是改变当前搜索区间，不断去逼近最左和最右侧的索引
* 同时我们还需要考虑边界问题，防止left 或 right 指针越界
:::

## 寻找最右侧索引
```js{14,15,18,25}
/**
 * @description
 * 找到目标值在数组中的左边界
 * 注意这里使用的是[left, right],
 * 两边都闭合的方式，需要注意
 * 1.循环结束条件 left <= right
 * 2.当找到目标值时区间向前进1位
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findLeft(nums, target) {
  let left = 0;
  let right = nums.length - 1; // 注意
  while (left <= right) { // 注意
    let mid = left + Math.ceil((right - left) / 2);
    if (nums[mid] === target) {
      right = mid - 1; // 注意
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  if (left >= nums.length || nums[left] !== target) { // 注意
    left = -1;
  }
  return left;
}
```

## 寻找最右侧索引
```js{15,16,19,26}

/**
 * @description
 * 找到目标值在数组中的右边界
 * 注意这里使用的是[left, right],
 * 两边都闭合的方式，需要注意
 * 1.循环结束条件 left <= right
 * 2.当找到目标值时区间向后进1位
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findRight(nums, target) {
  let left = 0;
  let right = nums.length - 1; // 注意
  while (left <= right) { // 注意
    let mid = left + Math.ceil((right - left) / 2);
    if (nums[mid] === target) {
      left = mid + 1; // 注意
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  if (right < 0 || nums[right] !== target) { // 注意
    right = -1;
  }
  return right;
}

```

## 求解
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let left = findLeft(nums, target);
  let right = findRight(nums, target);
  return [left, right];
}
```