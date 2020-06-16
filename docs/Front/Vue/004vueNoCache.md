# vue项目打包缓存问题

## 问题描述

vue项目打包后，多数时候，无法实时更新界面，往往需要手动清除浏览器缓存才能加载最新的界面，这样的话，用户体验并不是很好，如何解决这个问题呢？

下面介绍几种方法。

## 解决方法

1、禁止页面缓存，在index.html文件中添加如下标签。

```html
<meta http-equiv="pragram" content="no-cache">
<meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="expires" content="0">
```

2、在打包后的脚本文件后添加版本号，在```webpack.prod.conf.js ```文件中添加如下代码：

```js
const Version = new Date().getTime(); //定义一个时间作为版本号。
```

```js
output: {
  path: config.build.assetsRoot,
  // filename: utils.assetsPath('js/[name].[chunkhash].js'),
  // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  filename: utils.assetsPath('js/[name].[chunkhash]' + Version + '.js'),
  chunkFilename: utils.assetsPath('js/[id].[chunkhash]' + Version + '.js')
}
```