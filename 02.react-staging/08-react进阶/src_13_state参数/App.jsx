import React from 'react';
import {useRoutes} from 'react-router-dom';
import Header from './components/Header';
import MyNavLink from './components/MyNavLink';
import {routesTable} from './routes/index';//引入自定义的路由表
import './App.css';

export default function App() {
  // 使用useRoutes函数，根据路由表，自动生成路由
  const element = useRoutes(routesTable);
  return (
    <div id='wrapper'>
      <Header />
      <div className="main">
        <div className="main-left">
          <ul className="main-left-list">
            <MyNavLink to='/home'>Home</MyNavLink>
            <MyNavLink to='/about'>About</MyNavLink>
          </ul>
        </div>
        <div className="main-right">
          <div className="main-right-content">
            {/* 使用路由表自动生成的路由 */}
            {element}
          </div>
        </div>
      </div>
    </div>
  )
}


