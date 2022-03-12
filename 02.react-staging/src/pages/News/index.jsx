import React from 'react';
import { useNavigationType} from 'react-router-dom';

export default function News() {
  // 判断用户是怎么来到当前路由下的（push、replace、pop）
  // 当用户刷新时，就是pop
  // console.log(useNavigationType());

  return (
    <ul className='about-main-list'>
      <li>news 1</li>
      <li>news 2</li>
      <li>news 3</li>
    </ul>
  )
}
