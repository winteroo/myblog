# 001两数之和

## 题目
::: tip 题目
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
* 示例
```js
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```
:::

## 解析 <Badge text="解法说明"/>
::: tip 提示
:loud_sound:
此题有两种解答方式
* 利用两次循环，暴力遍历得到结果
* 利用一遍hash表处理
:::

## 暴力循环源码
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for(let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}
```

## 一遍hash表源码
```js{13,17,19}
/**
 * @description 两数之和
 * 利用一遍hash表处理
 * 原理：一边遍历map表，一边构建nums[i]:i形式的map
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    // 获取差值为map的key
    let key = target - nums[i];
    // 判断key值是否存在与hash表中，如果存在，则说明找到了那两个值，
    // 如果不存在，则设置hash表中nums[i]:i键值对
    if (map[key] !== undefined) {
      return [map[key], i]
    } else {
      map[nums[i]] = i;
    }
  }
};

let nums = [2, 7, 8, 9, 10];
console.log(twoSum(nums, 9));

```