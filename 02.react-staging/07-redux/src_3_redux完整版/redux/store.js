/* 
  创建redux的store对象，1个App只有1个store对象。
*/
import {createStore} from 'redux';
import CountReducer from './count-reducer.js';

export default createStore(CountReducer);