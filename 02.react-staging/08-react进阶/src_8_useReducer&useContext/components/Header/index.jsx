import React,{useContext} from 'react'
// 从父组件Color中引入上下文环境
import { ColorContext } from '../Color'

export default function Header() {
  // 解构出父组件Color共享的值
  const {color} = useContext(ColorContext);
  return (
    <div>
      <h1 style={{color: color}}>当前颜色为{color}</h1>
    </div>
  )
}
