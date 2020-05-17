# 033 -- 搜索旋转排序数组

## 题目
::: tip 题目
假设按照升序排序的数组在预先未知的某个点上进行了旋转。
( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
你可以假设数组中不存在重复的元素。
你的算法时间复杂度必须是 **O(log n)**(注意时间复杂度必须满足条件) 级别。
* 示例1
```js
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
```

* 示例2
```js
输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
```
:::

## 解析 <Badge text="解法说明"/>
::: tip 提示
:loud_sound:
* 刚刚接触这道题时，并不能理解他要做什么，既然要查找目标元素在数组中的索引，直接indexOf不就完事了吗，有啥好设计算法的，但是注意题目中的时间复杂度O(logn)，indexOF的时间复杂度是O(n)，明显不符合题意，所以很自然的能想到二分查找算法的运用。
* 此题还有一个注意点就是再执行二分时，肯定存在一部分是有序的。
* 我们只需要用二分查找去搜索有序部分，如果目标值可能存在于有序部分则，再对有序部分进行二分查找（正常思路的二分查找）
* 如果目标值不可能存在于有序部分，则我们就需要在无效序中查找，再次重复二分查找，不过这次就需要判断有序和无序部分了，即从第二步开始继续执行
:::

## 题解源码
```js
/**
 * @description
 * 利用二分查找方式
 * 1.利用将数组从中间分开
 * 此时肯定存在前半部分或是后半部分是有序的（重要）
 * 2.对有序部分执行二分查找
 * 3.如果目标值不可能存在于有序部分
 * 4.则将目标查找数组选择在无序部分
 * 5.继续进行1进行判断
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (!nums || nums.length === 0) return -1;
  let start = 0;
  let end = nums.length - 1;
  let mid;
  while (start <= end) {
    mid = Math.ceil((start + end) / 2);
    // 首尾中全部验证
    // 这里我把每次查找的边界条件都进行了判断，虽然有点智障，但是很容易的避免了边界问题。
    if (nums[mid] === target) return mid;
    if (nums[start] === target) return start;
    if (nums[end] === target) return end;
    // 说明前半部分有序  
    if (nums[start] < nums[mid]) {
      // 说明目标值存在于有序部分，将末尾设置为mid
      // 继续执行二分查找
      if (nums[start] < target && target < nums[mid]) {
        end = mid - 1;
      } else {
        // 说明目标值存在于后半段
        start = mid + 1;
      }
    } else {
      // 说明后半部分有序
      // 判断目标值是否在后半部分
      if (nums[mid] < target && target < nums[end]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
};
```