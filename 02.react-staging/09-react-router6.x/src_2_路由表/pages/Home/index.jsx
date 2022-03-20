import React,{useState} from 'react';
import {Button} from 'antd';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const [sum,setSum] = useState(0);
  return (
    <div>
      <h2>这是Home组件的内容</h2>
      {/* 根据sum的值判断是否切换路由 */}
      {sum === 99 ? <Navigate to='/about'/> : <h3>当前值为：{sum}</h3>}
      <Button type='primary' onClick={() => {setSum(99)}}>点我</Button>
    </div>
  )
}
