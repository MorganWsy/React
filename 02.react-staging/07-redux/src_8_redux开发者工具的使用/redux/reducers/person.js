import { ADD_PERSON } from "../constant";

// 定义初始值
const initialState = [{id: '1', name: 'www', age: 18}];
export default function PersonReducer(prevState=initialState,action){
  const {type,data} = action;
  switch (type) {
    case ADD_PERSON:
      return [...prevState,data];    
    default:
      return prevState;
  }
}