/* 
  创建redux的store对象，1个App只有1个store对象。
*/
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import CountReducer from './reducers/count';
import PersonReducer from './reducers/person';

// 组合多个组件的reducer，组合后redux管理的状态是combineReducers函数的参数对象，而不再是单个属性
const allReducers = combineReducers({
  count: CountReducer,
  persons: PersonReducer
});
export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));