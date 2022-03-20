import React from 'react';
import { NavLink } from 'react-router-dom';

// 定义链接的高亮样式
const activeStyle = {
  color: '#fff',
  backgroundColor: 'seagreen'
}
export default function MyNavLink(props) {
  return (
    // style属性的值如果是函数，则默认传入的参数是1个对象（包含isActive属性）
    // react-router-dom v6版本移除了activeClassName属性
    // 方法1：需要创建高亮对象
    // <NavLink className='list-item' style={({isActive}) => isActive ? activeStyle : undefined } {...props}/>
    // 方法2：activeStyle是高亮的样式类，需要在css文件中定义
    <NavLink className={({isActive}) => isActive ? 'list-item activeStyle' : 'list-item'} {...props}/>
  )
}
