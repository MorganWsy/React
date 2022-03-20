import React, { useContext } from 'react';
import { Button } from 'antd';
import { ColorContext, CHANGE_COLOR } from '../Color';

export default function MyButton() {
  // 从父组件Color中拿到可以发送action的dispatch函数
  const { dispatch } = useContext(ColorContext);
  return (
    <div>
      <Button type='primary' onClick={() => { dispatch({ type: CHANGE_COLOR, data: { color: 'red' } }) }}>变红</Button>
      <Button type='primary' onClick={() => { dispatch({ type: CHANGE_COLOR, data: { color: 'seagreen' } }) }}>变绿</Button>
    </div>
  )
}
