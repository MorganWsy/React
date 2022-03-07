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