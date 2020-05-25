# 数组扁平化

数组是我们日常工作经常用到的数据结构，那如何将多维数组转化为一维数组呢，下面介绍几种方法：

测试数组
```js
let arr = [1, [2, [3, [4,[6,8]]], 5]];
```

## 使用join()或toString()方法
```js
arr.toString().split(','); // ["1", "2", "3", "4", "6", "8", "5"]
arr.join().split(','); // ["1", "2", "3", "4", "6", "8", "5"]
```
这种方法虽然能将数组拉平，但是最后返回的数组中，数组的项都变成了字符串形式，并不能保持原数组
的数据的类型。
## 使用ES6的flat()方法
```js
arr.flat(Infinity); // [1, 2, 3, 4, 6, 8, 5]
```
使用ES6提供的```flat```方法，该方法接受一个变量，表示需要拉平的数组的层级，默认为1，这里Infinity表示，无论
多少层，全部拉平；
## 递归拉平
利用递归模拟```flat```方法。
```js
/**
 * 拉平数组
 * @param {Array} val 需要拉平的数组 
 * @param {Number} dep 需要拉平的层级
 */
function flattenDeep(val, dep) {
  let deepth = parseInt(dep) > 0 ? dep : Infinity;

  let type = Object.prototype.toString.call(val).slice(8, -1);

  if (type !== 'Array') return val;

  let res = [];

  baseFlatten(val, deepth);

  return res;

  function baseFlatten (arr, deepth) {
    if (Array.isArray(arr)) {
      if (deepth > 0) {
        for (let item of arr) {
          baseFlatten(item, deepth - 1);
        }
      } else {
        res.push(arr);
      }
    } else {
      res.push(arr);
    }
  }
}
```