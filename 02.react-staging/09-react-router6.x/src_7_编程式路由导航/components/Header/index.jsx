import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export default function Header() {
  const navigate = useNavigate();
  
  function back(){
    navigate(-1);
  }
  function forward(){
    navigate(1);
  }
  function goTwo(){
    navigate(2);
  }
  return (
    <div className="header">
      <h2>React Router6.x Demo</h2>
      <Button type='primary' onClick={back}>后退</Button>
      <Button type='primary' onClick={forward}>前进</Button>
      <Button type='primary' onClick={goTwo}>前进2页</Button>
    </div>
  )
}
