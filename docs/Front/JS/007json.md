# 007 -- json操作方法

## 循环替换未知深度的json数据的key值
函数接受两个变量
1. json原数据
2. 翻译数据map
::: warning 警告
:loud_sound:
此方法处理json会在原json数据的基础上改变数据，所以，如果你的json数据后续还会用到，请手动对json数据做一次**深拷贝**
:::

```js
/**
 * @description 遍历解析Json
 * @param {Object} jsonObj:需要解析的json数据
 * @param {Object} translate:key值对应的翻译map
 */
function parseJson(jsonObj, translate) {
  // 循环所有键
  for (let key in jsonObj) {
    //如果对象类型为object类型且数组长度大于0 或者 是对象 ，继续递归解析
    let element = jsonObj[key];
    for (let k in translate) {
      if (k === key) {
        jsonObj[translate[k]] = element;
        delete jsonObj[key];
      }
    }
    if (
      element.length > 0 && typeof (element) == "object" ||
      typeof (element) == "object"
      ) {
      parseJson(element, translate);
    }
  }
  return jsonObj;
}
```
## 改进循环替换未知深度的json数据的key值方法
::: tip 说明
:loud_sound:
因为第一个标题中的方法会改变原来的json数据，这很容易引起bug，因为大部分时间替换json的key值只是
为了更好的展示给用户，而实际使用中我们还是会使用原数据进行一系列的操作，所以改进了标题1的方法，在
方法内部深拷贝json数据，之后在替换key值时，使用拷贝后的json，这样就保证了原json数据的纯净性。
:::
```js
/**
 * @description 遍历解析Json,不会改变原json数据
 * @param {Object} jsonObj:需要解析的json数据
 * @param {Object} translate:key值对应的翻译map
 */
function cloneAndParseJson(json, translate) {
  // 关键拷贝 -> 重要
  let cloneJson = JSON.parse(JSON.stringify(json));
  function parseJson(jsonObj, translate) {
    for (let key in jsonObj) {
      let element = jsonObj[key];
      for (let k in translate) {
        if (k === key) {
          jsonObj[translate[k]] = element;
          delete jsonObj[key];
        }
      }
      if (
        element.length > 0 && typeof (element) == "object" ||
        typeof (element) == "object"
        ) {
        parseJson(element, translate);
      }
    }
    return jsonObj;
  }
  // 函数返回值 -> 重要
  return parseJson(cloneJson, translate);
}
```

## 深拷贝json数据
利用递归思想，递归结束条件：当前的source不是object类型

```js
/**
 * @description 深拷贝
 * @param {any} source 
 */
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

```