# <img src="https://ftp.bmp.ovh/imgs/2022/02/f86f98dd6ff7d01b.png" style="width:50%;margin-left:50%;transform:translateX(-50%)" />

# React Router 6 快速上手

## 1.概述

1. React Router 以三个不同的包发布到 npm 上，它们分别为：
   
   1. react-router：路由的核心库，提供了很多的：组件、钩子。
   2. <strong style="color:#dd4d40">**react-router-dom:**</strong ：<strong style="color:#dd4d40">包含react-router所有内容，并添加一些专门用于 DOM 的组件，例如 `<BrowserRouter>`等 </strong>。
   3. react-router-native：包括react-router所有内容，并添加一些专门用于ReactNative的API，例如:`<NativeRouter>`等。

2. 与React Router 5.x 版本相比，改变了什么？
   
   1. 内置组件的变化：移除`<Switch/>` ，新增 `<Routes/>`，移除`<Redirect/>`，新增`<Navigate/>`。
   
   2. 语法的变化：`component={About}` 变为 `element={<About/>}`；移除了`<NavLink>`的activeClassName属性等。
   
   3. 新增多个hook：`useParams`、`useNavigate`、`useMatch`等。
   
   4. <strong style="color:#dd4d40">官方明确推荐函数式组件了！！！</strong>
      
      ......

## 2.Component

### 1. `<BrowserRouter>`

1. 说明：`<BrowserRouter> `用于包裹整个应用。

2. 示例代码：
   
   ```jsx
   import React from "react";
   import ReactDOM from "react-dom";
   import { BrowserRouter } from "react-router-dom";
   
   ReactDOM.render(
     <BrowserRouter>
       {/* 整体结构（通常为App组件） */}
     </BrowserRouter>,root
   );
   ```

### 2. `<HashRouter>`

1. 说明：作用与`<BrowserRouter>`一样，但`<HashRouter>`修改的是地址栏的hash值。
2. 备注：6.x版本中`<HashRouter>`、`<BrowserRouter> ` 的用法与 5.x 相同。

### 3. `<Routes/> 与 <Route/>`

1. v6版本中移出了先前的`<Switch>`，引入了新的替代者：`<Routes>`。

2. `<Routes>` 和 `<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。

3. `<Route>` 相当于一个 if 语句，如果其路径与当前 URL 匹配，则呈现其对应的组件。

4. `<Route caseSensitive>` 属性用于指定：**匹配时是否区分大小写，默认为 false**。

5. 当URL发生变化时，`<Routes> `都会查看其所有子`<Route>` 元素以找到最佳匹配并呈现组件，**匹配成功后不会再继续向下匹配**。

6. `<Route>` **也可以嵌套使用**，还可以配合`useRoutes()`配置 “路由表”，两个用法都需要通过 `<Outlet>` 组件在你想放置的位置来渲染其子路由。

7. 示例代码：
   
   ```jsx
   <Routes>
       /*path属性用于定义路径，element属性用于定义当前路径所对应的组件。*/
       <Route path="/login" element={<Login />}></Route>
   
       /*用于定义嵌套路由，home是一级路由，对应的路径/home。*/
       <Route path="home" element={<Home />}>
         /* test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2*/
         <Route path="test1" element={<Test/>}></Route>
         <Route path="test2" element={<Test2/>}></Route>
       </Route>
   
       //Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx
       <Route path="users">
         <Route path="xxx" element={<Demo />} />
       </Route>
   </Routes>
   ```

### 4. `<Link>`

1. 作用: 修改URL而不发送网络请求（就是路由链接）。

2. 注意: 外侧需要用`<BrowserRouter>`或`<HashRouter>`包裹。

3. 示例代码：
   
   ```jsx
   import { Link } from "react-router-dom";
   
   function Test() {
     return (
       <div>
           <Link to="/路径">xxx</Link>
       </div>
     );
   }
   ```

### 5. `<NavLink>`

1. 作用: 与`<Link>`组件类似，且可实现导航链接的“高亮”效果。

2. 示例代码：
   
   ```jsx
   // 注意: NavLink默认类名是active，下面是指定自义的class: activeStyle
   //方法1：需要在css文件中定义activeStyle
   <NavLink
       to="/login"
       className={({ isActive }) => {
           return isActive ? 'base activeStyle' : 'base'
       }}
   >login</NavLink>
   //方法2：需要定义高亮对象
   const activeStyle = {
     color: '#fff',
     backgroundColor: 'seagreen'
   }
   <NavLink to='/login' className='base' style={({isActive})=>{
     return isActive ? activeStyle : undefined}}
   >login</NavLink>
   ```

3. NavLink 组件上的 `end` 属性，指定后，若子组件匹配路由，则子组件的路由链接高亮，但其父组件的路由链接不高亮！默认不指定，则子组件路由链接高亮，父组件的路由链接也会高亮。
   
   > 用法： `<Navigate to='/home' end>`

### 6. `<Navigate>`

1. 作用：只要`<Navigate>`组件被渲染，就会修改路径，切换视图。

2. <mark style='background-color:#fedc5e'>非常重要！</mark>

3. `replace`属性用于**控制跳转模式**（push 或 replace，默认是push）。
   
   > `<Navigate to='/home' replace={true}/>`

4. 示例代码：
   
   ```jsx
   import React,{useState} from 'react'
   import {Navigate} from 'react-router-dom'
   
   export default function Home() {
       const [sum,setSum] = useState(1)
       return (
           <div>
               <h3>我是Home的内容</h3>
               {/* 根据sum的值决定是否切换视图 */}
               {sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to="/about" replace={true}/>}
               <button onClick={()=>setSum(2)}>点我将sum变为2</button>
           </div>
       )
   }
   ```

### 7. `<Outlet>`

1. 当`<Route>`产生嵌套时，即嵌套路由，在`<Ouelet/>` 所处的位置渲染其子路由组件。

2. 示例代码：
   
   ```jsx
   // src/routes.index.js
   //根据路由表生成对应的路由规则
   const element = useRoutes([
     {
       path:'/about',
       element:<About/>
     },
     {
       path:'/home',
       element:<Home/>,
       //设置Home组件的子路由组件，也是个数组，每个对象就是一个二级路由
       children:[
         {// '/news'的'/'可以省略
           path:'news',
           element: <News/>
         },
         {
           path:'message',
           element: <Message/>,
         }
       ]
     }
   ])
   //Home.js
   import React from 'react'
   import {NavLink,Outlet} from 'react-router-dom'
   export default function Home() {
       return (
           <div>
             <h2>Home组件内容</h2>
               <div>
                 <ul className="nav nav-tabs">
                     <li>
                       {/* NOTE: to属性可以省略一级路由和斜杠 */}
                       <NavLink className="list-group-item" to="news">News</NavLink>
                     </li>
                     <li>
                       <NavLink className="list-group-item" to="message">Message</NavLink>
                     </li>
                 </ul>
                 {/* 指定路由组件呈现的位置 */}
                 <Outlet />
              </div>
           </div>
       )
   }
   ```

3. `<NavLink>`的 `to` 属性的值有3种写法：
   
   1. `to='news'`
   
   2. `to='./news'`
   
   3. `to='/news'`：这是错误写法，会被当做一级路由！其他两种都可以。

## 3.Hooks

### 1. useRoutes()

1. 作用：根据路由表，动态创建`<Routes>`和`<Route>`。

2. 示例代码：
   
   ```jsx
   //路由表配置：src/routes/index.js，项目中一般会新建一个routes文件夹，专门存放路由表
   import About from '../pages/About'
   import Home from '../pages/Home'
   import {Navigate} from 'react-router-dom'
   
   export default [
       {
           path:'/about',
           element:<About/>
       },
       {
           path:'/home',
           element:<Home/>
       },
       {
           path:'/',
           element:<Navigate to="/about"/>
       }
   ]
   
   //App.jsx
   import React from 'react'
   import {NavLink,useRoutes} from 'react-router-dom'
   import routes from './routes/index'
   
   export default function App() {
       //根据路由表生成对应的路由规则
       const element = useRoutes(routes)
       return (
           <div>
               ...
               {/* 注册路由 */}
               {element}
               ...
           </div>
       )
   }
   ```

### 2. useNavigate()

1. 作用：返回一个函数用来实现编程式导航。

2. <mark>非常重要！</mark>

3. 与 react-router-dom 5.x版本不同的是6.x版本不区分路由组件和普通组件。即在普通组件中也能使用`useNavigate()`。

4. 示例代码：
   
   ```jsx
   import React from 'react'
   import {useNavigate} from 'react-router-dom'
   import {Button} from 'antd'
   
   export default function Header() {
     const navigate = useNavigate();
     //第一种使用方式：第一个参数指定具体的路径，带斜杠会被认为是一级路由；
     //第二个参数是配置项，目前可以配置replace和state，params和search配置不了
     navigate('/home');
     navigate('detail',{
       replace: false,
       state: {
         id: '1',
         title: 'title1'
       }
     });
     //第二种使用方式：传入数值进行前进或后退，类似于5.x中的 history.go()方法
     function back(){
       navigate(-1);
     }
     function forward(){
       navigate(1);
     }
     function goTwo(){
       navigate(2);
     }
     return (
       <div className="header">
         <h2>React Router6.x Demo</h2>
         <Button type='primary' onClick={back}>后退</Button>
         <Button type='primary' onClick={forward}>前进</Button>
         <Button type='primary' onClick={goTwo}>前进2页</Button>
       </div>
     )
   }
   ```

### 3. useParams()

1. 作用：在函数式组件种，获取当前匹配路由的`params`参数，类似于5.x中的`this.props.match.params`（类式组件）。

2. 如果项目使用了“路由表”，则需要在路由表中使用占位符声明接收params参数。
   
   ```jsx
   // routes/index.js
   export const routesTable = [
     {
       path: '/home', 
       element: <Home/>,
     },
     {
       path: '/about', 
       element: <About/>,
       // 指定二级路由，也是个数组（每个对象就对于一个二级路由）
       children: [
         {
           // '/news'的 / 可省略
           path: 'news',
           element: <News/>
         },
         {
           path: 'message',
           element: <Message/>,
           // 定义三级路由
           children: [
             {
               // 声明接收params参数
               path: 'detail/:id/:title/:content',
               element: <Detail/>
             }
           ]
         }
       ]
     },
     {path: '/', element: <Navigate to='/home'/>}
   ];
   ```

3. 示例代码：
   
   ```jsx
   import React from 'react';
   import { useParams,useMatch } from 'react-router-dom';
   
   export default function Detail() {
     // 使用useParams方法获取params参数
     const {id,title,content} = useParams();
   
     // 使用useMatch方法可以拿到match对象，需要传入完整的路由地址，用的不多！
     // const a = useMatch('about/message/detail/:id/:title/:content');
     // console.log(a);
   
     return (
       <ul className='about-message-detail-list'>
         <li>id：{id}</li>
         <li>title：{title}</li>
         <li>content：{content}</li>
       </ul>
     )
   }
   ```

### 4. useMatch()

1. 作用：用于获取 `match` 对象，即类式组件中的 `this.props.match`。

2. 参数：接收一个完整的路由地址(从一级路由到末级路由)，如：`'/about/message/detail'`或`'/about/message/detail/:id/:title/:content'`。

3. <mark>用的不多，常用 `useParams()`</mark>

### 5. useSearchParams()

1. 作用：用于读取和修改当前位置的 URL 中的查询字符串。

2. 返回一个包含两个值的数组，内容分别为：当前的seaech参数、更新search的函数。

3. 示例代码：
   
   ```jsx
   import React from 'react';
   import { useSearchParams } from 'react-router-dom';
   import { Button } from 'antd';
   
   export default function Detail() {
     // 使用useSearchParams方法获取 search 参数，返回一个数组，第一项是URLSearchParams对象，第二项是修改search参数的函数
     const [search,setSearch] = useSearchParams();
     //URLSearchParams对象上有get和getAll方法，可以根据key拿到value
     const id = search.get('id');
     const title = search.get('title');
     const content = search.get('content');
   
     return (
       <ul className='about-message-detail-list'>
         <Button type='primary' onClick={() => {setSearch('id=8&title=title8&content=maybe')}}>修改search参数</Button>
         <li>id: {id}</li>
         <li>title: {title}</li>
         <li>content: {content}</li>
       </ul>
     )
   }
   ```

### 6. useLocation()

1. 作用：获取 location 对象，即类式组件中的 `this.props.loaction`对象。对象包含`search`、`state` 属性，所以也可以通过 `useLoaction()`来获取`search`、`state`参数。

2. 参数：无参数。

3. 示例代码：
   
   ```jsx
   import React from 'react';
   import { useLocation } from 'react-router-dom';
   
   export default function Detail() {
     // useLocation()可以获取location对象，包含search属性、state属性、pathname属性等等
     const {state:{id,title,content}} = useLocation();
   
     return (
       <ul className='about-message-detail-list'>
         <li>id: {id}</li>
         <li>title: {title}</li>
         <li>content: {content}</li>
       </ul>
     )
   }
   ```

### 7. useInRouterContext()

1. 理解：如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 true，否则返回 false。
   
   > 即如果组件被`<BrowserRouter>`或`HashRouter`包裹，则该在组件中使用`useInRouterContext()`会返回 true。如果`App`组件被包裹，则App组件内的所有组件使用`useInRouterContext()`都会返回 true（不区分路由组件和普通组件）。
   > 
   > 作用：当我们使用第三方库的时候，可以使用`useInRouterContext()` 来检测这个库是否是在路由器下封装的。

2. <mark>用的不多。</mark>

### 8. useNavigationType()

1. 作用：返回当前的导航类型，用户判断用户是如何来到当前页面的。
2. 返回值：`POP`、`PUSH`、`REPLACE`。
3. 注意：`POP`是指在当前路由下，用户刷新了页面，就会输出 pop。<mark>用的不多</mark>

```jsx
import React from 'react';
import { useNavigationType } from 'react-router-dom';

export default function News() {
  // 判断用户是怎么来到当前路由下的（push、replace、pop）
  // 当用户在组件News对于的路由下刷新时，就会输出pop
  console.log(useNavigationType());
  return (
    <ul className='about-main-list'>
      <li>news 1</li>
      <li>news 2</li>
      <li>news 3</li>
    </ul>
  )
}
```

### 9. useOutlet()

1. 作用：用来呈现当前组件中渲染的嵌套路由。

2. 示例代码：
   
   ```jsx
   import {useOutlet} from 'react-router-dom';
   
   const result = useOutlet()
   console.log(result)
   // 如果嵌套路由还没有挂载到页面上，则result为null
   // 如果嵌套路由已经挂载到页面上，则展示嵌套的路由对象
   ```

### 10.useResolvedPath()

1. 作用：给定一个 URL值，解析其中的：path、search、hash值。

2. 示例：
   
   ```jsx
   import {useResolvedPath} from 'react-router-dom';
   // 传入一个URL，会帮助我们解析这个URL，输出：
   {
     hash: "#qwe"
     pathname: "/about/message/detail"
     search: "?id=2&title=title2"
   }
   console.log(useResolvedPath('/about/message/detail?id=2&title=title2#qwe'))
   ```
