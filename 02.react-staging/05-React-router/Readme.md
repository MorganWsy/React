# React-router

## 1. 前言

- 老师所讲的，关于 react-router 的问题，这里都有笔记。
- 本项目使用`react-router-dom 5.x` 版本，最新版本为 6.x 版本（下载时使用 `yarn add react-router-dom@5`），两个版本语法有不同之处

## 2. 分类

- react-router-dom 用于 web 开发

- react-router-native 用于移动端开发

- react-router-any 用于任何地方，但是 API 不好用！

- **路由器(router)分为两种：**
  
  - `<BrowerRouter></BrowerRouter>`
  - `<HashRouter></HashRouter>`

- `<HashRouter>`所生成的链接，如：http://localhost:3000/#/abc/123
  
  - **默认会有#，且#后面的路径对应的资源默认当作前端资源，不会发送给服务器，无论你写什么路径。**
  - 可以解决地址变化后，刷新页面导致页面样式丢失的问题！！

## 3. 前端路由原理

1. 当我们点击超链接时，将更改浏览器地址栏的内容。如：点击【Home】链接，地址栏变为 localhost:3000/home
2. 地址栏一变化，react-router-dom 会监测到，路由器会根据不同的链接，使用不同的路由，在页面中渲染相应的组件！

## 4. 踩坑

**1. 使用路由链接来切换组件**

```jsx
  <Link to='/about'>About</Link>
  <Link to='/home'>Home</Link>
```

- Link 是组件，开头字母需要大写！
- to 属性的值不区分大小写，但是最好写小写！！
- 属性值中没有.

**2. 使用不同的路由来相应不同的组件**

```jsx
  <Route path='/about' component={About} />
  <Route path='/home' component={Home} />
```

- Route 也是组件，开头字母需要大写！
- path 属性的值对应着 Link 组件中 to 属性的值
- component 属性是小写的，其值对应不同的组件

**3. Link 组件和 Route 组件需要用路由器包裹起来**

```
 <BrowerRouter>
  <Link to='/about'>About</Link>
 </BrowerRouter>

 <BrowerRouter>
  <Route path='/about' component={About} />
 </BrowerRouter>
```

- 1 个 App 只能有 1 个路由器！！！所以<BrowerRouter>标签只能有一个，有多个路由器的话，Link 组件和 Route 组件不能通信。
- 如果分别用<BrowerRouter>标签包裹 Link 和 Route 组件，会有问题。所以我们可以用<BrowerRouter>包裹<App/>，实现 1 个应用只有 1 个路由器。

## 5. 路由组件与普通组件的不同：

1. 写法不同
   路由组件：<Route path='/about' component={About}/>
   普通组件：<Header/>
2. 存储的位置不同
   路由组件：都存放在**pages**文件夹中；
   普通组件：都存放在**component**文件夹中；
3. 接收的 props 不同
   普通组件：我们传什么属性它就能接收到什么属性；
   路由组件：接收来自路由器传递的 3 个属性：
   - **history**:（只留下了一些常用的）
     go: ƒ go(n)
     goBack: ƒ goBack()
     goForward: ƒ goForward()
     push: ƒ push(path, state)
     replace: ƒ replace(path, state)
   - **location**:（只留下了一些常用的）
     pathname: "/about"
     search: ""
     state: undefined
   - **match**:（只留下了一些常用的）
     params: {}
     path: "/about"
     url: "/about"

## 6. NavLink 组件

1. 比 Link 组件高级，可以实现点击链接并高亮（原理就是给点击的链接添加*active*类，默认是这个类名，这个类的样式需要自己去写）
- 类的名字也可以自定义：
  - react-router-dom 5.x：`<NavLink activeClassName='myActive' className='list-item' to='/about'></NavLink>`
  - react-router-dom 6.x：`<NavLink className={({isActive})=> "list-item " + (isActive ? "myActive" : '')}></NavLink>`
- 注意：如果项目中引入了 UI 库，如 bootstrap，自己写的样式*active*可能会被 UI 库覆盖，可以给自己的样式加上`!important`。
2. 二次封装 NavLink 组件
- NavLink 是普通组件；
- 每次写 NavLink 都需要加上`activeClassName`和`className`等公共属性，不够精简，所以需要优化一下；
- HTML 标签的标签体内容是一个特殊的标签属性，如<NavLink>我是标签体内容</NavLink>，控制台输出 h2 标签可以发现`children='我是标签体内容'`这个属性，即`this.props.children`可以获取**组件标签体**的内容（普通 html 标签通过 innerHTML 获取）

## 7. Switch 组件

1. 通常情况下，path 和 component 是一一对应关系，而 Switch 组件的作用就是实现他俩的单一匹配！
2. 用`<Switch></Switch>`包裹所有路由，当有多个路由，按顺序和路径匹配到了前面的，就不会再匹配后面的了，这样效率更高；
   如：
   
   ```jsx
   <Switch>
     <Route path="/about" component={About} />
     <Route path="/home" component={Home} /> //如果当前链接是/home，则会匹配这个路由，而下面的路由就不会再检查是否匹配了。
     <Route path="/home" component={Test} />
     <Route path="/abc" component={Abc} />
     ...
   </Switch>
   ```
3. 如果不用 Switch 包裹，则根据 path 检查所有的路由，相同 path 的路由都会匹配，并将组件渲染到页面上。

## 8. 刷新页面导致样式丢失的问题

- 在项目中引入 UI 库（在 index.html 中以 link 标签引入 css 文件），当网页地址是多级路由且刷新页面后，导致引入的 UI 库样式丢失！
- 解决方法：
  1. 我们可以将`./css/`中的`.`去掉，来解决这个问题；
  2. 可以使用 react 脚手架定义的 `%PUBLIC_URL%` ，以绝对路径引入 UI 库；
  3. 可以将 react 项目的`<BrowerRouter>`路由器换成`<HashRouter>`路由器。（用的较少）

## 9.  路由的精准匹配和模糊匹配

- **react 默认是模糊匹配，在实际项目中按默认的来，需要开启精准匹配时，再开启。**

- 当需要精准匹配时，可以给路由组件加上`exact`属性。因为开启精准匹配可能会导致不能匹配二级路由。
  
  - `<Route exact={true} path='/home' component={Home}/>`
  - 或者`<Route exact path='/home' component={Home}/>`

- **情形一：精准匹配**
  
  ```jsx
  <!-- 路由链接 -->
  <MyNavLink to='/home'>Home</MyNavLink>
  <!-- 路由 -->
  <Route path='/home' component={Home}/>
  ```
  
  - 匹配成功。

- **情形二：模糊匹配**
  
  ```jsx
  <MyNavLink to='/home/a/b'>Home</MyNavLink>
  <Route path='/home' component={Home}/>
  ```
  
  - 匹配成功。
  - **模糊匹配的规则就是前缀匹配**，当 to 属性的值最前头是/home 时，可以匹配到 Home 组件的路由。
  - 将 to 属性值按顺序分为 home a b，path 属性值按顺序分为 home，一个一个比较（不包含/）

- **错误写法 1：**
  
  ```jsx
  <MyNavLink to='/a/home/b'>Home</MyNavLink>
  <Route path='/home' component={Home}/>
  ```
  
  - 匹配失败。
  - 不满足前缀匹配，匹配不到 Home 组件的路由。

- **错误写法 2：**
  
  ```jsx
  <MyNavLink to='/home'>Home</MyNavLink>
  <Route path='/home/a/b' component={Home}/>
  ```
  
  - 匹配失败。
  - 路由链接与路由不匹配，只能路由链接的 to 属性值多，而路由的 path 属性值不能多

- **错误写法 3：**
  
  ```jsx
  <MyNavLink to='/home'>Home</MyNavLink>
  <Route path='/a/home' component={Home}/>
  ```
  
  - 匹配失败。
  - 原因同上。

## 10. 重定向组件——Redirect 组件

```jsx
<Switch>
  <Route path="/about" component={About} />
  <Route path="/home" component={Home} />
  <Redirect to="/about" />
</Switch>
```

- 兜底的，得放在所有路由的最后面，当前面的路由都没匹配上时，将路由链接重定向到/about，并渲染 About 组件。

## 11. 二级路由（嵌套路由）

- 注册子路由时，要写上父路由的 path 值；
- **每当网页地址改变，都会逐个匹配 App 中所有注册的路由，先注册的路由先匹配，也就是说一级路由比二级路由优先匹配；**
- **注意：只有当一级路由匹配成功后，才会开始匹配二级路由！！**
- 当网址变为 _/home/news_ 且开启模糊匹配时，路由匹配的过程：
  
  <!-- 一级路由 -->
  1. `<Route path='/about' component={About}/>`
  2. `<Route path='/home' component={Home}/>` //匹配成功后，渲染 Home 组件，并开始匹配 Home 组件下的二级路由
  3. `<Redirect to='/about'/>`
     
     <!-- 二级路由 -->
  4. `<Route path='/home/news' component={News}/>` //匹配成功，渲染 News 组件
  5. `<Route path='/home/message' component={Message}/>`
  6. `<Redirect to='/home/news'/>`
  - 此时，如果一级路由开启了精准匹配，则会导致无法匹配，会默认重定向到 About 组件。所以说，不要随便就开启精准匹配！

## 12. 向路由组件传递参数

- 总结：params 参数用的最多 > search 参数 > state 参数

### 1. 向路由组件传递 params 参数

```jsx
  <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
  <Route path='/home/message/detail/:id/:title' component={Detail} />
```

> - Link 组件的 to 属性值中的${msgObj.id}和${msgObj.title}是我们传递的 params 参数；
> - **传递了 params 参数，还需要声明接收**。`:id`和`:title`表示接收 params 参数，名字随便取，其值是${msgObj.id}和${msgObj.title}，保存在 Detail 组件的 props 对象中（_this.props.match.params_）

### 2. 向路由组件传递 search 参数（即 ajax 中的 query 参数）

```jsx
  <Link to={`/home/message/detail?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>
  <Route path='/home/message/detail' component={Detail}/>
```

> - 传递方法如上。**与传递 params 参数不同的是 search 参数不需要声明接收，只需正常注册路由即可。**
> - _search_ 参数保存在*Deatil*组件的*location*对象中（_this.props.location.search_)
> - _search_ 参数的值是*urlencoded*编码的字符串：'?id=1&title=message1'（注意带?号），需要引入*qs*库，将其解析为对象：{id: '1',title:'message1'}

### 3. 向路由组件传递 state 参数

```jsx
  <Link to={{pathname: '/home/message/detail',state:{id: msgObj.id, title:msgObj.title}}}>{msgObj.title}</Link>
  <Route path='/home/message/detail' component={Detail}/>
```

> - to 属性的值是对象！(其实其他两种方法的 to 属性也可以是对象，但是没必要)，需要传递 pathname 和 state 属性，state 属性的值也是对象，里面包含要传递值；
> - state 参数也不需要声明接收，只需正常注册路由即可；
> - 网页地址栏不会出现我们传递的参数！！；
> - state 参数默认值就是 undefined；
> - 如果传递了 state 参数，即使刷新页面也不会丢失 state 参数的值，除非你关掉浏览器或者清空了缓存。

## 13.  路由跳转的两种模式：push 和 replace

- 浏览器的 history 对象是一个栈结构，默认的模式是 push，即每次跳转都将新的 url 压入栈中，我们看到的页面就是栈顶的 url 对应的页面。当我们回退时，就会将栈顶的 url 弹出，前进时会将弹出的 url 重新压入栈中。
- replace 模式：每次跳转都会将栈顶的 url 替换掉，所以无法回退和前进。
  - 开启 replace 模式：
    
    ```jsx
    <Link replace={true} to='/xx/xx'>yyy</Link>
    或
    <Link replace to='/xx/xx'>yyy</Link>
    ```

## 14. 编程式路由导航

- 就是使用路由组件的 props 属性的 histoyr 对象上的 go()、goForward()、goBack()、push()、replace()方法来实现路由的跳转，想什么时候跳转就什么时候跳转，而不需要点击 Link或NavLink 组件来实现了；
  - 如：通过给按钮绑定单击事件，调用 push 或 replace 方法，同时配合 Route 组件，就可以实现编程式路由导航了；
- 同样需要 Route 组件配合，并根据传递参数的方法不同，用不同的方法来接收这些参数。

```jsx
// push模式 + params参数
this.props.history.push(`/home/message/detail/${id}/${title}`);
// replace模式 + params参数
this.props.history.replace(`/home/message/detail/${id}/${title}`);

// 路由组件
<Route path="/home/message/detail/:id/:title" component={Detail} />;
```

```jsx
// push模式 + search参数
this.props.history.push(`/home/message/detail?id=${id}&title=${title}`);
// replace模式 + params参数
this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`);

// 路由组件
<Route path="/home/message/detail" component={Detail} />;
```

```jsx
// push模式 + state参数
this.props.history.push(`/home/message/detail`,{id: xxx,title: yyy});
// replace模式 + state参数
this.props.history.replace(`/home/message/detail`,{id: xxx,title: yyy});

// 路由组件
<Route path="/home/message/detail" component={Detail} />;
```

## 15. withRouter函数

- `withRouter`是一个函数，可以将普通组件转换为路由组件，并返回转换后的新组件。
- 用法：`withRouter(Header)`
  - 将路由组件的props属性上的`history`、`loaction`、`match`对象赋给普通组件Header
  - 可以将返回的新组件暴露出去：`export default withRouter(Header)`

## 15. BrowerRouter和HashRouter

1. **底层原理不同**
   - `BrowerRouter`是通过操作HTML5的 **history API**  来实现的，不兼容IE9及以下版本；
   - `HashRouter`使用的是URL的哈希值，兼容性最好。
2. **path的表现形式不同**
   - BrowerRouter：http://localhost:3000/#/home/message
   - HashRouter：http://localhost:3000/home/message
3. **刷新页面后对state参数的值的影响不同**
   - 向路由组件传递state参数时，如果用的BrowerRouter，刷新页面state参数的值不会丢失，因为state的值保存在history对象中；而如果用的HashRouter，刷新页面则会丢失state值，因为HashRouter没有使用history对象去保存state。
4. **HashRouter可以解决一些与路径错误相关的问题**：比如二级路由时刷新页面导致样式丢失的问题。