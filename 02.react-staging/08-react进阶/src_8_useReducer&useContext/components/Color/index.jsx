import React, { createContext, useReducer } from 'react'

const colorReducer = (prevState, action) => {
  const { type, data } = action;
  switch (type) {
    case CHANGE_COLOR:
      return data.color;
    default:
      return prevState;
  }
}

// 定义action的类型的常量
export const CHANGE_COLOR = 'changeColor';
// 向外暴露ColorContext上下文对象，以便和Color的子组件通信
export const ColorContext = createContext({});

export default function Color(props) {
  // Color组件初始化时，newState 的值为 'seagreen'
  const [newState, dispatch] = useReducer(colorReducer, 'seagreen');
  console.log(newState);
  return (
    // 向子组件共享一个对象，对象包含color和dispatch函数
    <ColorContext.Provider value={{ color: newState, dispatch: dispatch }}>
      {/* 将value的值共享给所有Color组件的子组件 */}
      {props.children}
    </ColorContext.Provider>
  )
}
