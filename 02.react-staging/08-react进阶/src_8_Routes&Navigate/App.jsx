import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import MyNavLink from './components/MyNavLink';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';

export default function App() {
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
            <Routes>
              <Route path='/home' element={<Home/>} />
              <Route path='/about' element={<About/>} />
              {/* 5.x版本的Redirect组件已经被Navigate组件替代了。只要匹配到'/'，就自动跳到Navigate指定的路由组件 */}
              <Route path='/' element={<Navigate to='/home'/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}


