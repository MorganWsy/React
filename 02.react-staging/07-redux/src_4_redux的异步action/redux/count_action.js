/* 
  用于为Count组件生成action对象
*/
import {INCREMENT, DECREMENT} from './constant';

export const createIncreAction = (data) => {
  return {type: INCREMENT, data};
}

export const createDecreAction = (data) => {
  return {type: DECREMENT, data};
}
// 用于生成异步加action
export const createIncreAsyncAction = (data, delayTime) => {
  // 通过redux-thunk中间件，store会帮我们调用返回的函数，并将store.dispatch函数作为参数传入，所以就不需要引入store.js文件了
  return (dispatch) => {
    // 使用定时器发送同步action，从而实现异步action
    setTimeout(() => {
      dispatch(createIncreAction(data));
    }, delayTime);
  }
}