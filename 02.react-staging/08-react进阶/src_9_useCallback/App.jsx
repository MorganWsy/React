import React from 'react';
import Size from './components/Size';
/* 
  目的：使用 createContext()、useContext() 和 useReducer() 实现父子、祖孙组件之间数据的共享。效果类似于使用 redux
*/
export default function App() {
  return (
    <div>
      <Size />
    </div>
  )
}
