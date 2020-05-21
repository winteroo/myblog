# Koa2源码剖析

Koa（Koa2）是一个新的 web 框架，由 Express 幕后的原班人马打造， 
致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 
通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 
而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

Koa的源码非常短小、精炼，大致可以分成4个模块：

* 1、web服务器的创建
* 2、构造context对象
* 3、中间件机制（洋葱圈模型）
* 4、错误捕获与处理

接下来就让我们一同探索吧！

## 源码目录结构
Koa2的源码目录很清晰，总共四个文件

* ```application.js``` 入口文件，包含服务器创建、中间件机制
* ```context.js``` 包含context对象创建以及错误处理
* ```request.js``` 请求封装方法（大量包含get 、set）
* ```response.js``` 响应封装方法（大量包含get 、set）


![koa2source](~@Backend/Nodejs/images/koaDirList.png)

## 源码总览

入口文件进入，我们可以发现Koa其实是一个继承自Emitter的类，
context.js、request.js、response.js分别导出了各自封装的对象
伪代码如下：
```js
const response = require('./response');
const context = require('./context');
const request = require('./request');

module.exports = class Application extends Emitter {
  constructor(options) {
    super();
    this.middleware = []; // 中间件队列
    this.context = Object.create(context); // 从./context.js文件导出的context对象初始化context
    this.request = Object.create(request); // 从./request.js文件导出的request对象初始化request
    this.response = Object.create(response);// 从./response.js文件导出的response对象初始化response
  }
  ......
}
```


## 服务器创建

在koa的官网中提供了如下创建web服务器的方式：
```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```
可以发现，在创建了Koa实例后，调用实例上的```listen```方法，便可以创建一个web服务器。

在源码```application.js```中，找到```listen```方法源码如下：
```js
listen(...args) {
  debug('listen');
  const server = http.createServer(this.callback());
  return server.listen(...args);
}
```
利用```nodejs```的原生HTTP模块创建web服务器，这里关键的是回调函数```this.callback()```，我们继续
查看```this.callback()```的源码。
```js
callback() {
  const fn = compose(this.middleware);

  if (!this.listenerCount('error')) this.on('error', this.onerror);

  const handleRequest = (req, res) => {
    const ctx = this.createContext(req, res);
    return this.handleRequest(ctx, fn);
  };

  return handleRequest;
}
```
函数第一行，组合中间件，咱们放到后面中间件一节探讨，继续往下，错误处理先略过，
```handleRequest```这个函数被返回，该函数的第一句，我们从字面意思可以理解这句是用来创建context对象的。

## 构造context对象
来到```createContext ```函数定义:
```js
createContext(req, res) {
  const context = Object.create(this.context);
  const request = context.request = Object.create(this.request);
  const response = context.response = Object.create(this.response);
  context.app = request.app = response.app = this;
  context.req = request.req = response.req = req;
  context.res = request.res = response.res = res;
  request.ctx = response.ctx = context;
  request.response = response;
  response.request = request;
  context.originalUrl = request.originalUrl = req.url;
  context.state = {};
  return context;
}
```
这个函数返回了一个context对象，context上委托了```request```、```response```、```res```、```req```、```app```等对象，
具体的context

## 中间件机制（洋葱圈模型）
有了context对象，回到```handleRequest```函数，他返回了```this.handleRequest(ctx, fn)```的结果，
下面查看```this.handleRequest```源码
```js
handleRequest(ctx, fnMiddleware) {
  const res = ctx.res;
  res.statusCode = 404;
  const onerror = err => ctx.onerror(err);
  const handleResponse = () => respond(ctx);
  onFinished(res, onerror);
  return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```
```fnMiddleware```是中间件组合之后返回的函数，所以我们接下来便来看中间件的核心组合函数```compose```,

## 错误捕获与处理

## 实现简单的koa

## 总结