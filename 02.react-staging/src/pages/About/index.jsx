import React from 'react';
import { Outlet } from 'react-router-dom';
import MyNavLink from '../../components/MyNavLink';

export default function About() {
  return (
    <div>
      <h2>这是About组件的内容</h2>
      <div>
        <ul className='about-nav-list'>
          {/* NOTE: to属性可以省略一级路由和斜杠 */}
          {/* <MyNavLink to='/about/news'>News</MyNavLink> */}
          <MyNavLink to='news'>News</MyNavLink>
          <MyNavLink to='message'>Message</MyNavLink>
        </ul>
        {/* 指定路由组件放置的位置 */}
        <Outlet />
      </div>
    </div>
  )
}
