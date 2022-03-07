# redux 笔记

## 1. redux 文档

1. 英文文档: https://redux.js.org/
2. 中文文档: http://www.redux.org.cn/
3. Github: https://github.com/reactjs/redux

## 2. redux 理解

### 1. redux 是什么？

1. redux 是一个专门用于做状态管理的 JS 库（不是 react 插件库，也不是官方出品）。
2. 它可以用在 react, angular, vue 等项目中, **但基本与 react 配合使用**。
3. 作用: **集中式管理 react 应用中多个组件共享的状态。**

### 2. redux 什么时候用？

1. 某个组件的状态，需要让其他组件可以随时拿到时（即多个组件之间共享状态）。
2. 一个组件需要改变另一个组件的状态时（通信）。
3. **总体原则：能不用就不用, 如果不用比较吃力才考虑使用（因为有一定的学习成本）**

### 3. redux 工作流程图

![redux工作流程图](./redux原理图.png)

1. React Components 相当于来餐厅吃饭的客人们；
2. Action Creators 相当于餐厅服务员们，可以有多个，负责统计客户的点的菜（1 个菜对应 1 个 action，action 就是普通的 js 对象，包含 type 和 data 属性）并通过 dispatch 方法将菜名上报给老板；
3. Store 相当于餐厅老板，只有 1 个！负责接收服务员传递过来的菜名，并将每个客户的菜名分发给厨师们 Reducers 去做。
4. Reducers 相当于厨师，可以有多个，分别为不同客户的做菜，并将做好的菜交给老板。
5. 客户通过 getState 方法从老板那里拿到自己点的菜。

## 3. 求和案例——纯 react 实现

> 很简单，自己看代码。

## 4. 求和案例——react+redux 精简版

> 不包括 ActionCreators，action 对象由我们手动创建。

1. 下载 redux：`yarn add redux`

2. 在 src 文件夹下新建：
- redux 文件夹
  
  - store.js
  - count_reducer.js
3. 在 store.js 文件中：
- 引入 redux 中的 createStore 函数，该函数用于创建 1 个 store；

- createStore(reducer)接收 1 个为其服务的 reducer（即餐厅老板开店之前需要聘用厨师）；

- 将创建的 store 对象暴露出去。
4. 在 count_reducer.js 文件中：
- reducer 有两个作用：初始化状态、加工状态；

- reducer 本质是 1 个函数，接收 2 个参数：prevousState、action，并返回加工后的状态；

- reducer 函数第 1 次调用时（组件状态初始化时），是 store 自动调用的，传递的 prevousState 是 undefined，action 中的 type 是'@@redux/INITx.x.x.x'，x.x.x.x 是随机生成的，没有传递 data。后面每当我们传递 action 对象，store 都会帮我们调用 reducer 函数来加工状态。

- 将创建的 reducer 函数暴露出去；
5. redux 只负责集中管理组件的状态，不负责渲染页面，所以当组件通过 getState 方法拿到加工后的状态时，组件并不会在页面中重新渲染，这时需要我们在组件中手动监测 redux 中状态的变化：

```jsx
  // Count组件的index.jsx
  componentDidMount(){
    // subscribe方法用于监测redux状态的变化；
    // 回调函数会在store中的状态改变时自动调用；
    store.subscribe(() => {
      this.setState({});
    });
  }
```

也可以直接在项目的 index.js 文件中监测 redux：

```js
// index.js
ReactDOM.render(<App />, document.getElementById("root"));
store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
```

6. 在组件的 index.jsx 文件中：
- 引入 store 对象；
- 将组件本来的 state 去掉；
- 通过 store.getState()获取加工后的状态；
- 通过 store.dispatch(action)向 store 发送 action 对象。

## 5. 求和案例——react+redux 完整版

- 在 redux 文件中新建：
  - count_action.js 即 ActionCreators 部分，用来生成 action 对象。
  - constant.js 用于管理常量，保存 action 对象的 type 属性的值

## 6. redux 的异步 action

- **同步 action**：js 中的普通对象；
- **异步 action**：函数；
- store 只会将普通对象交给 reducer 进行加工，所以如果是异步 action，**需要依赖 redux-thunk 中间件**，通过中间件告诉 store 传入的是异步 action，让 store 帮我们调用这个函数，而在这个函数内部执行异步任务（通过定时器或者发送 ajax 请求，将同步 action 给 reducer 进行加工）
- **异步 action 不是必须的，完全可以在组件自身中通过定时器或发送 ajax 请求到达异步 action 的效果。**
- 中间件用法：
  - 在 store.js 文件中引入 _redux-thunk_。
    
    ```jsx
    // 引入applyMiddleware函数
    import { createStore, applyMiddleware } from "redux";
    // 引入redux-thunk模块（中间件）
    import thunk from "redux-thunk";
    import CountReducer from "./count-reducer.js";
    // 使用中间件
    export default createStore(CountReducer, applyMiddleware(thunk));
    ```
  - 创建异步 action：
    
    ```jsx
    // count_action.js
    export const createIncreAsyncAction = (data, delayTime) => {
    // 通过redux-thunk中间件，store会帮我们调用返回的函数，并将store.dispatch函数作为参数传入，所以就不需要引入store.js文件了
    return (dispatch) => {
      // 使用定时器发送同步action，从而实现异步action
      setTimeout(() => {
        dispatch(createIncreAction(data));
      }, delayTime);
    };
    };
    ```

# react-redux

## 1. 介绍

- react-redux 是 facebook 官方出品，功能和 redux 一样，但是它是专门为 react 服务的，用法比 redux 更复杂；
- 它将 react 组件分为 **容器组件** 和 **UI 组件**，它们是父子关系。
- **容器组件由 react-redux 中的 connect 函数创建**；UI组件由我们自己创建。
- 用法：
  1. 下载：`yarn add react-redux`
  2. 在 src 文件夹下新建 *containers\Count\index.jsx* 文件，在该文件中引入 react-redux 和 Count 的 UI 组件，通**过 react-redux 提供的 connect 函数，将容器组件与 UI 组件建立联系**；
  3. 在 App.jsx 中取消引入 UI 组件，而引入容器组件和 store 对象，**并将 store 对象作为容器组件的 props 属性，而不是在容器组件中直接引入 store 对象!!**。

## 2. 原理图

<img src="./react-redux%E6%A8%A1%E5%9E%8B%E5%9B%BE.png" title="" alt="原理图" width="565">

## 3. 基本使用

容器组件围绕 connect 函数展开工作：

1. 给 connect 函数传入两个参数：**mapStateToProps函数**、**mapDispatchToProps函数**（**或对象**）；
   
   - mapStateToProps 函数**负责将 redux 中的状态传递给 UI 组件**；
     
     - 接收 1 个参数，**该参数就是 store.getState() 得到的值**（由 react-redux 帮我们调用）
     
     - 返回 1 个对象，也必须是对象！**该对象的 key 就映射为 UI 组件的 props 属性的 key，该对象的 value 就映射为 UI 组件的 props 属性的 value**；
     
     - 函数的名字是 react-redux 提供的，也可以取其他名字。
   
   - mapDispatchToProps 函数**负责将 redux 中操作状态的方法传递给 UI 组件**；
     
     - 接收 1 个参数，**该参数就是 store.dispatch 函数**；
     
     - 返回 1 个对象，也必须是对象！**该对象的 key 会被映射为 UI 组件的 props 属性的 key，该对象的 value 会被映射会 UI 组件的 props 属性的 value**；
     
     - 函数的名字是 react-redux 提供的，也可以取其他名字。
   
   - 如果 mapDispatchToProps 是对象，则应该这么写：
     
     ```jsx
     //只需要将创建action的函数作为value，react-redux 就会自动调用dispatch
     //方法将action分发出去（在底层API上做了优化），个人绝对这么写不好理解。
     const mapDispatchToProps = {
       increment: createIncreAction,
       decrement: createDecreAction,
       incrementAsync: createIncreAsyncAction,
     }
     ```

2. 分别实现 mapStateToProps 函数和 mapDispatchToProps 函数或对象。

3. 使用了 react-redux 就不需要再使用 store.subscribe(()=>{}) 来监测 redux 的状态是否改变了，因为react-redux实现了父组件与子组件通信（**父组件给子组件传递props，只要props属性发送变化，就会重新渲染子组件**）
   
   > **优化：** 如果App中有多个容器组件，每个容器组件都需要 store 对象，则给每个容器组件手动传入 store 对象很麻烦，可以借助 react-redux 提供的 Provider 组件，用该组件包裹 App 组件，且向该组件传入 store 对象，则 App 中的所有容器组件都能接收到 store 对象。
   > 
   > ```jsx
   > // index.js
   > import {Provider} from 'react-redux';
   > import store from './redux/store';
   > ReactDOM.render(
   >     <Provider store={store}>
   >         <App/>
   >     </Provider>,
   >     document.getElementById("root")
   > );
   > ```


