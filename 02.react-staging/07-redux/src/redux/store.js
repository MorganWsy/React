/* 
  创建redux的store对象，1个App只有1个store对象。
*/
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import CountReducer from './count-reducer.js';

export default createStore(CountReducer, applyMiddleware(thunk));