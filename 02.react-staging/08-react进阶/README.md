# React进阶

## 1. setState函数的两种写法

1. `setState(stateChange, [callback])`：**对象式的 setState**
   
   - stateChange 为状态改变对象(该对象可以体现出状态的更改)。
   
   - callback 是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用。
   
   ```jsx
   const {count} = this.state;
   this.setState({count: count+1}, ()=>{
    // 接收的第二个参数是一个回调函数，可以得到修改后的状态！
    console.log(this.state.count);
   });
   ```

2. `setState(updater, [callback])`：**函数式的 setState**
   
   - updater 是一个函数，返回 stateChange 对象。
   
   - updater 可以接收到 state 和 props 。
   
   - callback 是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
   
   ```jsx
   // 函数默认接收两个参数：state和props，并返回状态改变对象。
   // setState 同样可以接收第二个参数。
   this.setState((state,props) => {
    return {count: state.count+1};
   }, ()=>{});
   ```

3. 总结：
   
   1. **setState 函数是同步执行的，但传入的对象或函数是异步执行的**。所以之间在 setState 函数后面无法获取修改后的状态。
   
   2. 对象式的 setState 是函数式的 setState 的简写方式(语法糖)
   
   3. 使用原则：
      
      - 如果新状态不依赖于原状态 ==> 推荐使用对象方式
      
      - 如果新状态依赖于原状态 ==> 推荐使用函数方式
      
      - 如果需要在 setState() 执行后获取最新的状态数据, 
        要在第二个参数： callback 函数中读取。

## 2. 组件的懒加载

1. 通过 React 的 `lazy函数`配合`import()`动态加载路由组件，路由组件代码会被分开打包。
   
   - `lazy` 函数接收一个函数（该函数的返回值是使用`import`函数导入的需要懒加载的组件。）lazy 函数返回的就是需要懒加载的组件。

2. 引入 Suspense 组件，包裹所有路由组件，并提供 `fallback` 属性，属性值为 Home、About 组件加载出来之前的内容，比如`Loading...`

```jsx
import {Suspense, lazy} from 'react';
import Loading from './components/Loading';

const Home= lazy(() => {return import('./pages/Home')});
const About = lazy(() => {return import('./pages/About')});
<Suspense fallback={<Loading/>}>
  <Switch>
    <Route path="/home" component={Home}/>
    <Route path="/about" component={About}/>
  </Switch>
</Suspense>
```

## 3. React hooks

- React Hook / Hooks 是什么？
  
  - Hook 是 React 16.8.0 版本增加的**新特性/新语法**。
  
  - **可以让你在函数式组件中使用 state 以及其他的 React 特性**。

- 三个常用的 Hook
  
  - State Hook:` React.useState()`
  
  - Effect Hook: `React.useEffect()`
  
  - Ref Hook: `React.useRef()`

### 3.1 State Hook

- State Hook让函数式组件也可以有state状态, 并进行状态数据的读写操作。

- 语法：`const [xxx, setXxx] = React.useState(initalValue)`
  
  > 比如：`const [count,setCount] = React.useState(0);`

- useState()说明:
  
  - 参数: **只有1个参数，该参数的值就是初始化的状态，且会在内部作缓存**。
  
  - 返回值: **包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态的函数**。

- setXxx() 的2种写法:
  
  - `setXxx(newValue)`: 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值。
  
  - `setXxx(value => newValue)`: 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值。

- 函数式组件会执行 `n+1` 次（初始化组件1次，每次修改状态重新执行函数组件）

### 3.2 Effect Hook

- Effect Hook 可以让你在函数组件中执行副作用操作（**用于模拟类组件中的生命周期钩子**）

- React 中的副作用操作:
  
  - 发ajax请求数据获取
  
  - 设置订阅 / 启动定时器
  
  - 手动更改真实DOM

- 语法和说明：
  
  ```jsx
  React.useEffect(() => { 
    // 在此可以执行任何带副作用操作
    ...
    // 返回的函数就是类式组件中的componentWillUnmount()
    return () => { 
      // 在此做一些收尾工作, 比如清除定时器/取消订阅等
      ...
    }
  }, [stateValue]); 
  ```
  
  - 如果 useEffec() 的第二个参数是空数组：则 useEffect 的第一个参数对于的函数相当于 `componentDidMount()`。
  
  - 如果useEffec() 不传第二个参数：则 useEffect 的第一个参数对于的函数相当于 `componentDidMount()` + `componentDidUpdate()`，且会应用于 state 中的所有属性。
  
  - useEffec() 的第二个参数是` [stateValue1, stateValue2,...]`：则 useEffect 的第一个参数相当于 `componentDidMount()` + `componentDidUpdate()`，则只会应用于数组中的 state 属性。

- 可以把 useEffect Hook 看做如下三个函数的组合：
  
  - `componentDidMount()`
  
  - `componentDidUpdate()`
  
  - `componentWillUnmount()`

### 3.3 Ref Hook

- Ref Hook 可以在函数组件中存储或查找组件内的标签或任意其它数据。
- 语法：`const refContainer = React.useRef()`
- 作用：保存标签对象，功能与类式组件中的 `React.createRef()`一样。

## 4. Fragment组件

- 用法：
  
  ```jsx
  import {Fragment} from 'react';
  render(){
    return (
      <Fragment key={1}>
        <div>一些内容</div>
        <h2>一些内容</h2>
        ...
      </Fragment>
    );
  }
  ```

- 作用：在定义组件时，不再需要用一个真实DOM去包裹所有标签了，作用和`<>...</>` 相同。

- 与用空标签包裹所有标签不同的是：**Fragment 可以添加 key 属性**，其他属性也能添加，但是没有意义，因为 react 渲染时，会忽略 Fragment。而空标签中不能有任何属性。

## 5. Context属性

- 就是组件实例对象上的 `context` 属性。

- 作用：一种实现组件之间通信的方式，一般用于【祖先组件】与【后代组件】的通信（父子组件通过props 通信，最简单）。

- 语法：
  
  - 创建 Context 容器对象：`const XxxContext = React.createContext();`
    
    > 需要全局定义，为了祖先组件和后代组件都能用。
  
  - 在祖先组件中，使用 `<XxxContext.Provider>` 包裹子组件，通过标签的 `value` 属性给后代组件传递数据（ value 属性名字是规定死的，不能改）：
    
    ```jsx
    // value 属性的值可以是任何js支持的数据，如单个数据:value='wsy'或 
    // value={变量}，则后代组件的context属性的值就是wsy，也可以是对象:value={{username: 'wsy'}}
    <XxxContext.Provider value={数据}>
      <子组件/>
    </XxxContext.Provider>
    ```
  
  - **后代组件声明接收**，就能拿到祖先组件传递过来的数据。
    
    - 声明接收的第一种方式：**仅适用于类式组件**。
    
    - 声明接收的第二种方式：**类式组件和函数式组件都适用**。
    
    ```jsx
    //第一种方式: 在后代组件中这么写：
    // contextType 这个命名是规定是的！！
    static contextType = XxxContext;// 声明接收context
    
    //第二种方式: 在后代组件中这么写：
    <xxxContext.Consumer>
      {
        (value) => {  // value 就是后代组件接收到的数据
          return <你要显示的内容>
        }
      }       
    </xxxContext.Consumer>
    ```

- 注意：在应用开发中一般不用 context，一般都用它的封装 react 插件。

## 6. React组件优化

- React组件的两个问题：
  
  - 只要执行`setState()`，无论修不修改状态，组件都会重新渲染 ==> 效率低。
  
  - 只要父组件重新`render()`，子组件就会重新渲染，即使子组件没有用到父组件的任何数据 ==> 效率低。

- 问题的原因：组件的`componentWillUpdate()` 钩子总是返回 `true`。

- 优化的目的：
  
  - 只有当组件的 state 或 props 的值发生了变化，才重新渲染组件；
  
  - 当子组件没有使用父组件的任何数据时，父组件重新渲染不会导致子组件重新渲染。

- 优化方法：
  
  1. 修改每个组件的 `componentWillUpdate()` 钩子：比较新旧 state 和 props 的值，如果变化了，则返回true；没变化则返回false。
     
     > 如果state或props中有多个属性发生变化，则不能这么比较，可以循环遍历state对象或props对象进行比较，也可以借助其他库帮我们比较。
     
     ```jsx
     export default class A extends Component {
       state = {username: 'wsy', age: 20}
     
       handleChangeName = () => {
         // const {username} = this.state;
         this.setState({username: 'www'});
       }
     
       // 控制组件是否更新的钩子
       shouldComponentUpdate(newProps,newState){
         //console.log(this.props,this.state);
         //console.log(newProps, newState);
         //return !(this.state.username === newState.username);
         let count = 0;
         for (const key in this.state) {
           if(this.state[key] !== newState[key]){
             count++;
           }
         }
         return count >= 1 ? true : false;
       }
       render() {
         console.log('组件A渲染了~~');
         const {username} = this.state;
         return (
           <div className='parent'>
             <h2>我是组件A</h2>
             <h3>我的用户名是：{username}</h3>
             <Button type='primary' onClick={this.handleChangeName}>更改名字</Button>
             <B {...this.state}/>
           </div>
         )
       }
     }
     
     class B extends Component {
       shouldComponentUpdate(newProps,newState){
         //单个属性比较
         //console.log(this.props);
         //console.log(newProps);
         //return !(this.props.username === newProps.username);
         //循环遍历比较
         let count = 0;
         for (const key in this.props) {
           if(this.props[key] !== newProps[key]){
             //统计变化了的属性的个数，只要有1个变化了，就得更新
             count++;
           }
         }
         return count >= 1 ? true : false;
       }
       render() {
         console.log('组件B渲染了~~');
         return (
           <div className='child'>
             <h2>我是组件B</h2>
             <h3>我从A组件中接收到的名字是{this.props.username}</h3>
           </div>
         )
       }
     }
     ```
  
  2. 使用 `PureComponent` 组件代替 `Component`组件。
  
  > PureComponent 组件重写了 shouldComponentUpdate() ，只有state或props属性的值有变化才返回 true 。
  > 
  > 注意：它只是进行state和props属性的**浅比较**，**如果只是数据对象内的某个属性的值改变了，会返回 false**。所以不要直接修改state或props数据，而是要设置新的state对象或props对象。
  
  ```jsx
  // 错误示范
  state = {username: 'wsy', age: 20};
  handleChangeName = () => {
    let obj = this.state;
    obj.username = 'www';
    //obj和state指向同一个对象，这里直接修改了state属性，错误！
    this.setState(obj);
  }
  //正确示范
  handleChangeName = () => {
    //设置新的对象去更新状态
    this.setState({username: 'wsy',age: 18});
  }
  ```
  
  - 使用`PureComponent`组件：
    
    ```jsx
    import React,{PureComponent} from 'react';
    export default class A extends PureComponent{
      ...
    }
    ```
  
  - 在项目中一般使用`PureComponent`组件来优化。

## 7. render props

- 如何向组件内部动态传入带内容的的结构或标签？
  
  - Vue 中：使用 slot 技术，也就是在组件标签体中传入结构`<Parent><Child/></Parent>`
  
  - React 中有两个方法：
    
    - 使用 `this.props.children`： 在组件标签体中传入结构或标签。通过下面的例子可知，`this.props.children` **可以实现祖先组件和后代组件之间通信，但是无法实现父子组件之间的通信。**
    
    ```jsx
    export default class A extends Component {
      state = {username: 'wsy', age: 20}
      render() {
        return (
          <div className='parent'>
            <h2>我是组件A</h2>
            <B>
              {/* 在B组件的标签体中传入组件C */}
              <h3>我是组件B，我的名字是{this.state.username}</h3>
              <C username={this.state.username}/>
              {/* 也可以引入其他组件 */}
            </B>
          </div>
        )
      }
    }
    class B extends Component {
      render() {
        return (
          <div className='child'>
            <h2>我是组件B</h2>
            {/* <C/> */}
            {/* 通过this.props.children接收传入的结构或标签 */}
            {this.props.children}
          </div>
        )
      }
    }
    class C extends Component{
      render(){
        return (
          <div className='descendant'>
            <h2>我是组件C</h2> 
            <h3>我是组件C，我接收到的名字是{this.props.username}</h3> 
          </div>
        )
      }
    }
    ```
    
    - 使用 `this.props.render`：通过组件标签的属性传入结构，而且可以携带数据，一般用这个方法。通过例子可以发现，使用`this.props.render` **可以实现祖先组件和后代组件的通信，也可以实现父子组件之间的通信**。
      
      > render 这个名称可以改，任意的，但一般使用 render
    
    ```jsx
    export default class A extends Component {
      state = {username: 'wsy', age: 20, gender: 'male'}
      render() {
        const {gender} = this.state;
        return (
          <div className='parent'>
            <h2>我是组件A</h2>
            {/* 方法2：使用render()，接收组件A和组件B传递的数据，并返回组件C */}
            <B render={(username, age) => <C username={username} age={age} gender={gender}/>}/>
            {/* 也可以引入其他组件 */}
          </div>
        )
      }
    }
    class B extends Component {
      state = {username: 'www', age: 18}
      render() {
        const {username, age} = this.state;
        return (
          <div className='child'>
            <h2>我是组件B</h2>
            {/* 接收传入的结构，并向组件C传入username和age数据 */}
            {this.props.render(username,age)}
          </div>
        )
      }
    }
    class C extends Component{
      render(){
        return (
          <div className='descendant'>
            <h2>我是组件C</h2>  
            <h3>我是组件C，我接收到了{this.props.username},{this.props.age},{this.props.gender}</h3>
          </div>
        )
      }
    }
    ```

## 8. 错误边界(Error Boundary)

- 理解：用来捕获**后代组件**的错误，并用备用组件替换掉出错的组件。

- 特点：**只能捕获后代组件生命周期产生的错误，不能捕获自身组件产生的错误和其他组件在合成事件、定时器中产生的错误**。

- 用法：使用 `getDerivedStateFromError()` 和 `componentDidCatch()` 钩子。
  
  > 例子演示了后代组件C出现错误，我们使用错误边界来处理错误。一般是在父组件中处理子组件中的错误，我这里是在祖先组件中处理错误。
  > 
  > 注意：错误边界只能在祖先组件或父组件中捕获子组件的错误，并处理。！且只能捕获子组件的生命周期函数中出现的错误！如果是自己定义的函数出现错误，则捕获不到。
  
  ```jsx
  export default class A extends Component {
    state = {hasError: ''}
  
    // NOTE：这是静态方法，默认接收错误信息，并返回包含错误信息的状态对象
    static getDerivedStateFromError(error){
      //console.log('@@@',error);
      return {hasError: error};
    }
    // NOTE: 使用componentDidCatch()捕获错误，进行统计，并向后台反馈错误，告知开发人员及时处理错误。
    componentDidCatch(error, info){
      console.warn('组件渲染出错！');
      console.log(error,info);
    }
    render() {
      return (
        <div className='parent'>
          <h2>我是组件A</h2>
          <B hasError={this.state.hasError}/>
        </div>
      )
    }
  }
  class B extends Component {
    render() {
      return (
        <div className='child'>
          <h2>我是组件B</h2>
          {
            // 判断子组件是否出错，出错了则用备用组件替换子组件，从而防止错误展示在页面上或防止错误扩散导致所有组件都不显示
            this.props.hasError ? <h2>当前网络不稳定，请稍后再试</h2> : <C />
          }
        </div>
      )
    }
  }
  class C extends Component{
    state = {
      // users: [
      //   {id: '1', name: 'www', age: 20},
      //   {id: '2', name: 'wsy', age: 20},
      //   {id: '3', name: 'wzy', age: 21}
      // ]
      // 故意传递错误的数据
      users: 'abc'
    }
    render(){
      return (
        <div className='descendant'>
          <h2>我是组件C</h2>  
          <ul style={{fontSize: '14px',listStyle: 'inside'}}>
            {
              this.state.users.map((user) => {
                return <li key={user.id}>我是{user.name}，我{user.age}岁</li>;
              })
            }
          </ul>
        </div>
      )
    }
  }
  ```

## 9. 组件间通信方式总结

1. 组件间的关系
   
   - 父子关系
   
   - 兄弟关系（非嵌套组件）
   
   - 祖孙关系（跨级组件）
   
   - 其他

2. 几种通信方式
   
   - **props**：
     
     - children props，即`this.props.children`
     
     - render props，即`this.props.render()`
   
   - **消息订阅与发布**：
      pubs-sub、event等等
   
   - **集中式管理**：
     redux、dva等等
   
   - **context:**
     生产者-消费者模式

3. 搭配推荐：
   
   - 父子组件：props
   
   - 兄弟组件：消息订阅与发布、集中式管理
   
   - 祖孙组件：消息订阅与发布、集中式管理、context(开发用的少，封装插件用的多)
   
   - 其他：消息订阅与发布、集中式管理

## 10. React Router 6.x版本

- 在`02.react-staging/` 目录中，修改 `package.json` 文件中`react-router-dom: ^6`，在终端输入`yarn install`，更新 react-router-dom 到 6.x 版本。

- 其他内容看`ReactRouter6老师笔记.md`。
