import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import MyNavLink from './components/MyNavLink';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div id='wrapper'>
        <div className="header">
          <h2>React Router Demo</h2>
        </div>
        <div className="main">
          <div className="main-left">
            <ul className="main-left-list">
              {/* 原生html中，靠<a>跳转不同的页面 */}
              {/* <a className="list-group-item" href="./about.html">About</a>
							<a className="list-group-item active" href="./home.html">Home</a> */}

              {/* 在React中靠路由链接(<Link>)实现切换组件——编写路由链接 */}
              {/* <NavLink activeClassName='myActive' className='list-item' to='/about'>About</NavLink>
              <NavLink activeClassName='myActive' className='list-item' to='/home'>Home</NavLink> */}

              {/* 二次封装NavLink */}
              <MyNavLink to='/about'>About</MyNavLink>
              <MyNavLink to='/home'>Home</MyNavLink>
            </ul>
          </div>
          <div className="main-right">
            <div className="main-right-content">
              <Switch>
                {/* 注册路由 */}
                <Route path='/about' component={About}/>
                <Route path='/home' component={Home}/>
                {/* 兜底的，得放在最后面，当前面的路由都没匹配上时，将路由链接重定向到/about */}
                <Redirect to='/about'/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

