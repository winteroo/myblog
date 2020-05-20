# Redux初探

## 1.安装
redux是独立的数据状态管理插件，要想和react搭配使用，还需要添加react-redux用来将二者链接起来，发挥其强大作用。
```bash
npm install redux react-redux --save
```

## 2.创建唯一数据中心store
利用redux的createStore创建唯一数据中心store，createStore接受reducer为第一个参数，中间件作为第二个参数（此处引用的redux-thunk插件用于扩展reducer不仅可以接受action对象作为参数，同时还能接受一个函数作为参数，由此实现在action中实现异步请求）。

::: tip
 **subscribe** 这个函数是用来去订阅 store 的变化，比如你每次对 store 进行 dispatch(action) 都会触发 subscribe 注册的函数调用，这个在实际情况不是必须要的，看自己的应用场景，比如你想监控 store 的全局变化时 可以用 subscript 订阅一下，然后作一些反应。
:::
```jsx
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers/index'
import thunk from 'redux-thunk'

let store = createStore(reducers, applyMiddleware(thunk));

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
  console.log(store.getState())
);

export default store;
```

## 3.修改store内数据的唯一动作提交action
要想修改store内的数据唯一方法就是提交action，action是一个带有tyoe属性的对象，其他属性可以任意填写。编写action需要注意几点：
- 单独存储action的type，避免不必要的无提示的错误编写；
- 通过函数创建action，前面我们说过，引入了redux-thunk插件，他允许action返回一个函数作为dispatch的对象，例如actionCreator.js中的getData函数。

```jsx
//actionTypes.js
const Types = {
  SET_DATA: 'SET_DATA',
  SET_NORMAL: 'SET_NORMAL',
  SET_LOADING: 'SET_LOADING'
};

export default Types;
```
```jsx
// actionCreator.js
import Types from './actionTypes';

const actionCreator = {
  setLoading: () => {
    return {
      type: Types.SET_LOADING,
      payload : {
        loading: true
      }
    }
  },
  getData: () => {
    return (dispatch, getState) => {
      let action = {
        type: Types.SET_DATA,
        payload: {
          loading: false
        }
      };
      console.log(getState());
      setTimeout(() => {
        dispatch(action);
      }, 3000);
    }
  },
  normal: () => {
    return {
      type: Types.SET_NORMAL,
      payload: {
        count: 4
      }
    }
  }
}

export default actionCreator;
```

## 4.神奇的reducer

reducer是唯一可以更改store中数据的方法，而且reducer应该是一个没有任何副作用的纯函数，即固定输入，固定输出（每次输入同样的数据都应该得到唯一的输出），这里的副作用值得是setTimeout、异步请求等操作。以下代码展示了将reducer如何进行拆分，利用redux的combineReducers函数，将多个reducer合并为一个reducer返回。导出的大reducer作为createStore的第一参数。

```jsx
// index.js
import { combineReducers } from 'redux'
import home from './home'
import detail from './detail'

export default combineReducers({
  home,
  detail
});
```
```jsx
// reducer 是纯函数，输入固定，输出固定
// 不能含有任何副作用代码
import Types from '../actions/actionTypes'
let defaultState = {
  flag: 1,
  loading: false
};
const home = (state = defaultState, action) => {
  switch (action.type) {
    case Types.SET_DATA:
      return Object.assign({}, state, {
        flag: state.flag + 1,
        loading: action.payload.loading
      })
    case Types.SET_LOADING:
      return Object.assign({}, state, {
        loading: action.payload.loading
      })
    case Types.SET_NORMAL:
      return Object.assign({}, state, {
        flag: state.flag + action.payload.count
      })
    default:
      return state;
  }
}

export default home;
```
```jsx
//detail.js
let defaultState = {};
const detail = (state = defaultState, action) => {
  switch(action.type){
    default:
      return state;
  }
}

export default detail;
```
## 5.react和redux的强力胶水react-redux

react作为视图层框架，用于管理用户界面，而redux作为数据层框架，用于几种管理数据，如何将二者联系起来，统一管理数据，数据变动触发视图更新呢？答案就是强力胶水react-redux，react-redux利用connect函数将react视图组件和store中的数据连接起来，具体代码：

```jsx
import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import actionCreator from '../actions/actionCreator';

class TestRedux extends Component {
  handleClick () {
    this.props.setLoading();
    this.props.getData();
  }
  render () {
    return (
      <div>
        <div>{this.props.flag}</div>
        <Button
            onClick={this.handleClick.bind(this)}
            type="primary"
        >增加</Button>
        <Button
            onClick={this.props.getCount}
            type="primary"
        >增加4</Button>
      </div>
    );
  }

}
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    flag: state.home.flag
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  return {
    getData () {
      const action = actionCreator.getData();
      dispatch(action);
    },
    getCount () {
      const action = actionCreator.normal();
      dispatch(action);
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);
```

react-redux的 connect函数接受两个参数mapStateToProps和mapDispatchToProps,正如两个函数的名字一样，两个函数返回一个映射，一个是state => props的映射，一个是dispatch => props 的映射，将store中的数据映射到对应组件的props属性上，这样我们便可以再组件中使用这些属性。
## 注意
::: tip 

利用redux-thunk我们返回了getData这个异步函数action，细心的朋友可能已经发现，我再组件中映射dispatch时，利用actionCreator创建了getData的action，然后立即dispatch了这个action，而且在dispatch的这个函数中进行了异步操作，当操作成功后再次调用dispath，整个数据更新操作中dispath了两次，我的理解是
* 1、立即发出的dispatch用于告知redux，我要更新数据，但是我现在不更新，你等我下一次通知。
* 2、异步请求成功后发出的dispatch就是这个下一次通知，然后redux相应这个更新，修改store中的数据。

:::


## 结语
react和redux分管视图和数据，实现了数据视图的真正分离，这是在大型应用中很好地，也是易于维护的，但是任何事情都有利有弊，当应用逐渐变大，**action和reducer的量也会相应变得更加繁琐**，虽然数据变化和流转是明确的但是对于多数项目来说，还达不到足够大，**敏捷、高效有时才是王道**，这就是我理解的近年来vue盛行的原因。vue凭借其易学、易用性迅速崛起。为了解决redux的繁琐，mobx应运而生，[mobx](https://cn.mobx.js.org/)采用类似vue的响应机制，细粒度的观测让数据变化不再这么繁琐，下节，我们会剖析mobx的基础使用，一起学起来吧!









