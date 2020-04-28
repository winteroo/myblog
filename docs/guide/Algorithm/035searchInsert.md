# 034 搜索插入位置

## 题目描述
::: tip 题目
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
你可以假设数组中无重复元素。
* 示例1
```js
输入: [1,3,5,6], 5
输出: 2
```
* 示例2
```js
输入: [1,3,5,6], 7
输出: 4
```
:::

## 题目解析 <Badge text="解法说明"/>
::: tip  提示
:loud_sound:
* 标签：**二分查找** 
* 如果该题目暴力解决的话需要 O(n)O(n) 的时间复杂度，但是如果二分的话则可以降低到 O(logn)O(logn) 的时间复杂度
整体思路和普通的二分查找几乎没有区别，
* 先设定左侧下标 left 和右侧下标 right，再计算中间下标 mid
* 每次根据 nums[mid] 和 target 之间的大小进行判断，相等则直接返回下标，nums[mid] < target 则 left 右移，nums[mid] > target 则 right 左移
* 查找结束如果没有相等值则返回 left，该值为插入位置
* 时间复杂度：O(logn)O(logn)
:::

## 二分查找源码
::: tip  注意
:boom:
* 二分查找需要注意边界外问题，需要思考选取是 **[left, right]** 这种全闭区间，还是 **[left, right)** 这种前闭后开的区间
:::
```js{8,10,12,22}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  if(nums.length === 0) return 0;
  let len = nums.length - 1;
  let left = 0;
  let right = len;
  let mid = 0;
  while (left <= right) {
    mid = left + Math.ceil((right - left) / 2); 
    if (nums[mid] === target) {
      return mid;
    } else if(nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  return left;
};


let nums = [1,3,5,6]
let target = 7;

console.log(searchInsert(nums, target));
```