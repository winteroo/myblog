# 000 -- 实现进制之间相互转换

## 题目

实现各种进制之间的相互装换

## 代码实现
::: tip
十进制转化为其他任意进制的数，这里是采用的数学上的进制转换竖式，不断进行除法取余，最后余数倒序输出即为所求
:::
```js
/**
 * 10进制转换为任意进制
 * @param {Number} number 十进制数值 
 * @param {*} sys 要转换的进制
 */
function scale(number, sys) {
  let stack = [];
  let num = number;
  let rem;
  let binaryStr = '';
  while (num > 0) {
    rem = Math.floor(num % sys);
    stack.push(rem);
    num = Math.floor(num / sys);
  }
  return stack.reverse().join('');
}
```
::: tip
任意进制转换为十进制，其实就是根据每个位上的数字乘上该位的基准，最后将数值相加即可
:::
```js
/**
 * 任意进制转换为10进制
 * @param {String} str sys进制数字表示的字符串 
 * @param {*} sys 进制数
 */
function scaleten(str, sys) {
  let num = 0;
  for (let i = 0; i< str.length; i++) {
    num += Number(str.charAt(i)) * Math.pow(sys, str.length - i - 1);
  }
  return num;
}
```