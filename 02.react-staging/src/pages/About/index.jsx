import React from 'react';
import { Outlet,useOutlet, useResolvedPath } from 'react-router-dom';
import MyNavLink from '../../components/MyNavLink';

export default function About() {
  console.log(useOutlet());
  console.log(useResolvedPath('/about/message/detail?id=2&title=title2#qwe'));
  return (
    <div>
      <h2>这是About组件的内容</h2>
      <div>
        <ul className='about-nav-list'>
          {/* NOTE: to属性可以省略一级路由和斜杠 */}
          {/* <MyNavLink to='/about/news'>News</MyNavLink> */}

          {/* 开启replace模式 */}
          <MyNavLink to='news' replace>News</MyNavLink>
          <MyNavLink to='message'>Message</MyNavLink>
        </ul>
        {/* 指定路由组件放置的位置 */}
        <Outlet />
      </div>
    </div>
  )
}
