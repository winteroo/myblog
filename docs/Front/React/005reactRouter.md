# React-Router-Dom

react-router是路由组件核心，而react-router-dom是在react-router的基础上扩展了dom组件Link、HashRouter等。

## 1.react-router-dom安装
```bash
 npm install react-router-dom --save
```

## 2.基础使用方法
直接贴代码，首先需要从reacr-router-dom中引出所需的组件，这里采用hash模式路由，此次我再router.js文件中配置了路由规则，包括path和component，之后循环出路由组件。其中switch组件用于选择其下的匹配路由进行展示，其中还包含Redirect重定向组件，当所有的路由都无法匹配时，会重定向到该组件配置的to路由。
```jsx
// App.jsx
import React, {
  Component
} from 'react';
import router from './router/index';
import { HashRouter, Route, Switch, Redirect  } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }
  initRouter () {
    let routerList = router.map(item => (
      <Route
          component={item.component}
          exact
          key={item.path}
          path={item.path}
      ></Route>
    ));
    return routerList;
  }
  render () {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            {this.initRouter.bind(this)()}
            <Redirect
                path="/*"
                to="/home"
            ></Redirect>
          </Switch>
        </HashRouter>
      </div >
    );
  }
}

export default App;

```

以下为路由配置文件，其中引入了@loadable/component包用于路由懒加载，优化首页加载速度

```jsx
// router.js路由配置
// 路由懒加载方式
import loadable from '@loadable/component'

const router = [{
    path: '/home',
    component: loadable(() => import('../pages/HomePage'))
  },
  {
    path: '/detail',
    component: loadable(() => import('../pages/DetailPage'))
  }
];

export default router;

```
## 3.路由跳转

* 方法一：使用react-router-dom提供的Link组件进行跳转

```jsx
<Link to="/about">About</Link>
```

* 方法二：使用react-router-dom封装的push、goBack、go、replace方法进行跳转

```jsx
// 可以使用对象也可使用路径path
this.props.history.push({
  pathname: '/detail'
});
this.props.history.push( '/detail');
// 类似vue的go
this.props.history.go(-1);
// 返回上一路由
this.props.history.goBack();
// 替换当前路由防止出现死循环
this.props.history.replace('/detail');
```

## 4.路由传参

* 方法一：params，利用此方法传递的参数会保留在浏览器的地址栏，刷新页面参数与任然存在，从match中取值，建议采用这种方法。

```jsx
<Route path='/path/:name/:id' component={Demo}/>
<link to="/path/lisi/2">xxx</Link>
this.props.history.push({pathname:"/path/" + name + id});
读取参数用: this.props.match.params // { name: 'lisi', id:'2' }
```
* 方法二：query，此方法传递的参数不会存在于地址栏，故刷新页面参数会丢失，从location中取值。

```jsx
<Route path='/query' component={Demo}/>
<Link to={{ path : ' /query' , query : { name : 'lisi' }}}>
this.props.history.push({pathname:"/query",query: { name : 'lisi' }});
读取参数用: this.props.location.query   // { name:'lisi' }
```

* 方法三：state，此方法和query方法相似，同样是隐式传递，从location中取值，不会存在于地址栏，刷新页面参数会丢失，但是state中的数据是加密传输的，较安全。

```jsx
<Route path='/sort ' component={Demo}/>
<Link to={{ path : ' /sort ' , state : { name : 'lisi' }}}> 
this.props.history.push({pathname:"/sort ",state : { name : 'lisi' }});
读取参数用: this.props.location.query  // { name:'lisi' }
```
## 5.使用react.lazy实现路由懒加载
前面我们利用的是loadable-components插件实现的路由懒加载，在react16.6.0后，react引入了lazy方法，用于动态加载组件，由此我们可以利用它来实现路由懒加载。

```jsx
// 路由懒加载方式

// 利用loadable/component动态加载组件
// import loadable from '@loadable/component'

// const router = [{
//     path: '/home',
//     component: loadable(() => import('../pages/HomePage'))
//   },
//   {
//     path: '/detail',
//     component: loadable(() => import('../pages/DetailPage'))
//   },
//   {
//     path: '/mobx',
//     component: loadable(() => import('../pages/testmobx'))
//   }
// ];

// 利用react.lazy动态加载组件
import { lazy } from 'react'
const router = [{
  path: '/home',
  component: lazy(() => import('../pages/HomePage'))
},
{
  path: '/detail',
  component: lazy(() => import('../pages/DetailPage'))
},
{
  path: '/mobx',
  component: lazy(() => import('../pages/testmobx'))
}
];

export default router;
```

::: tip 说明
组件渲染，需要注意的是使用react.lazy动态加载路由**必须指定Suspense，并添加回调渲染组件，用于在加载组件过程中显示loading效果，如果不指定该组件，react会报错**
:::

```jsx
import React, {
  Component,
  Suspense
} from 'react';
import router from './router/index';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  initRouter () {
    let routerList = router.map(item => (
      <Route
        component={item.component}
        exact
        key={item.path}
        path={item.path}
      ></Route>
    ));
    return routerList;
  }
  render () {
    return (
      <div className="App">
        <HashRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {this.initRouter.bind(this)()}
              <Redirect
                path="/*"
                to="/home"
              ></Redirect>
            </Switch>
          </Suspense>
        </HashRouter>
      </div >
    );
  }
}

export default App;

```
## 6.使用react-router-config实现嵌套路由
::: tip 说明
react-router-config是为react-router写的优雅的配置路由表的插件
[react-router-config地址](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config)
:::

其实上面的路由也是采用路由配置的方式组织的，但是不够优雅，也不支持嵌套路由，使用react-router-config将方便我们进行路由嵌套配置。
* 1.修改路由配置表如下，其中Home组件下嵌套了TestMobx组件,并接收id参数
>**注意：嵌套路由的父组件（此处是Home组件）不可以添加 exact: true选项，添加后会导致子路由无法匹配，无法实现嵌套路由**
```jsx
const router = [{
    path: '/home',
    component: lazy(() => import('../pages/HomePage')),
    routes: [{
      path: '/home/mobx/:id',
      component: lazy(() => import('../pages/testmobx'))
    }]
  },
  {
    path: '/detail',
    component: lazy(() => import('../pages/DetailPage')),
    exact: true
  },
];

export default router;
```

* 2.修改路由组件利用renderRoutes 函数渲染route组件

```jsx
import React, {
  Component,
  Suspense
} from 'react';
import router from './router/index';
import { HashRouter, Route, Switch, Redirect,Link } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
class App extends Component {
  initRouter () {
    let routerList = router.map(item => (
      <Route
        component={item.component}
        exact
        key={item.path}
        path={item.path}
      ></Route>
    ));
    return routerList;
  }
  render () {
    return (
      <div className="App">
        <HashRouter>
          <ul>
            <li><Link to="/home">首页</Link></li>
            <li><Link to="/detail">详情页</Link></li>
            <li><Link to="/home/mobx/123">嵌套</Link></li>
          </ul>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {renderRoutes(router)}
              <Redirect
                path="/*"
                to="/home"
              ></Redirect>
            </Switch>
          </Suspense>
        </HashRouter>
      </div >
    );
  }
}

export default App;
```
* 3.想要实现嵌套，必不可少的我们需要在父级组件出添加renderRoutes渲染this.props.route.routes其中的子组件。

```jsx
import React, { Component } from 'react';
import { Button } from 'antd';
import { renderRoutes } from "react-router-config";

class HomePage extends Component {
  render () {
    return (
      <div>
        <div >homePage</div>
        {/* 此处的routes应该是配置中的子组件，如果路由配置中配置的children，那么这里就是 this.props.route.children*/}
        {renderRoutes(this.props.route.routes, { someProp: "these extra props are optional" })}
      </div>
    );
  }
}

export default HomePage;
```
## 7.router-react-dom相关链接
- [react-router-dom官网](https://reacttraining.com/react-router/web/guides/quick-start)
- [路由懒加载组件--loadable-components](https://github.com/gregberge/loadable-components)
- [react.lazy官方文档](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)