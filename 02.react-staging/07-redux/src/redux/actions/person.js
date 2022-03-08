import { ADD_PERSON } from "../constant";

// data是1个对象，包含id,name,age属性
export const createAddPersonAction = (data) => {
  return {type: ADD_PERSON, data};
}