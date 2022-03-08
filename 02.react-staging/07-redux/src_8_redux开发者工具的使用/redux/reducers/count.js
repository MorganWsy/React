/* 
  - 创建为Count组件服务的Reducer，用来加工Count组件的状态，本质是个函数。
  - 该函数接收两个参数：prevState和action，返回修改后的state
*/
import { INCREMENT, DECREMENT } from "../constant";

// NOTE：初始化状态时，如果不给定prevState的默认值，则prevState=undefined，type="@@redux/INITxxxxx，没传data；
// 如果给定了默认值，则prevState就等于这个默认值。
const initState = 0;

export default function countReducer(prevState=initState, action){
  const {type, data} = action;
  // 根据type的类型，去做相应的事
  switch(type){
    case INCREMENT:
      // 将结果传为number类型
      return prevState + data - 0;
      // 有了return就不需要break了
    case DECREMENT:
      return prevState - data - 0;
    default:
      // 如果既不是加也不是减，说明不需要改变状态
      return prevState;
  }
}