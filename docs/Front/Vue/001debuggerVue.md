# 调试Vue程序

vue大大提高了我们编写前端代码的效率，但是你知道如何在浏览器中找到自己写的vue源码并打断点调试吗？
下面我们就介绍三种调试vue程序的方法。

::: tip
调试vue程序的第一奥义是生成source map文件，正确引导浏览器找到指定的代码位置。

打开 config/index.js 并找到 devtool property。将其更新为：

如果你使用的是 Vue CLI 2，请设置并更新 config/index.js 内的 devtool property：
```js
devtool: 'source-map',
```
如果你使用的是 Vue CLI 3，请设置并更新 vue.config.js 内的 devtool property：
```js
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  }
}
```
:::

## 1、谷歌浏览器调试

确保你的vue程序已经成功启动，打开项目地址，打开控制台（F12），找到Source，打开```webpack://```文件夹,

找到你需要调试的文件，这里便可以像普通js一样打断点调试程序了。

![debug1](~@Front/Vue/images/debug1.png)

## 2、vs code调试
使用vs code打开vue程序，先不要启动项目。点击在 Activity Bar 里的 Debugger 图标来到 Debug 视图，
然后点击那个齿轮图标来配置一个 launch.json 的文件，选择 Chrome/Firefox：Launch 环境。
然后将生成的 launch.json 的内容替换成为相应的配置：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    },
    {
      "type": "firefox",
      "request": "launch",
      "name": "vuejs: firefox",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "pathMappings": [{ "url": "webpack:///src/", "path": "${webRoot}/" }]
    }
  ]
}
```
::: tip
请确保你已经安装了 **Debugger for Chrome** 或者 **Debugger for Firefox**，安装了哪个插件就
相应的添加哪个插件的配置。
:::

至此配置全部完成，接下里我们启动项目
* 1、运行```npm run dev```启动项目

* 2、在需要打断点的地方，打上断点（如果你连vs code怎么打断点都不知道，那我们就不是很合适了，拜拜！）

* 3、点击左上角的绿色三角按钮启动debug调试。

配图如下：

![debug2](~@Front/Vue/images/debug2.png)

* 4、debug启动的同时，会启动chrome页面，此时，操作页面发现可进入刚才打的断点

![debug3](~@Front/Vue/images/debug3.png)
![debug4](~@Front/Vue/images/debug4.png)


## 3、vue Devtools调试

其中最流行和简单的是使用非常棒的 Chrome 版本和 Firefox 版本的 Vue.js devtools。
使用 devtools 有很多好处，比如它可以让你能够实时编辑数据 property 并立即看到其反映出来的变化。
另一个主要的好处是能够为 Vuex 提供时间旅行式的调试体验。

![debug5](~@Front/Vue/images/debug5.gif)

::: tip
因为作者本身水平并不是很高，在实际开发中，还真是很少用到devtools，还没有get到这款工具的实际使用点在哪里，
感觉还是利用浏览器的断点调试最为方便。
:::

参考文档：[在 VS Code 中调试](https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html)