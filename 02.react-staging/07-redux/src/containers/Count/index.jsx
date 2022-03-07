/* 
  Count组件的容器组件，用于Count的UI组件与redux的间接通信。
  - 目的：让UI组件只负责页面渲染，而容器组件负责与redux直接通信。
  - 注意：并不是在容器组件中引入store对象，而是App.jsx文件中引入，并将store对象作为容器组件的props属性传递。
*/
import {connect} from 'react-redux';
import CountUI from '../../components/Count';
import { 
  createIncreAction,
  createDecreAction,
  createIncreAsyncAction
} from '../../redux/count-action';


/* 
  - mapStateToProps函数负责将redux中的状态传递给UI组件；
  - 接收1个参数，该参数就是store.getState()得到的值（由react-redux帮我们调用）
  - 返回1个对象，也必须是对象！该对象的key就映射为UI组件的props属性的key，该对象的value就映射为UI组件的props属性的value；
  - 函数的名字是react-redux提供的，也可以取其他名字。
*/
// const mapStateToProps = function(state){
//   return {count: state};
// }
// NOTE：简写。函数返回的是1个对象时，需要用()括起来，不然js会认为{}是代码块。
const mapStateToProps = state => ({count: state});

/* 
  - mapDispatchToProps函数负责将redux中操作状态的方法传递给UI组件；
  - 接收1个参数，该参数就是store.dispatch函数；
  - 返回1个对象，也必须是对象！该对象的key会被映射为UI组件的props属性的key，该对象的value会被映射会UI组件的props属性的value；
  - 函数的名字是react-redux提供的，也可以取其他名字。
*/
// const mapDispatchToProps = function(dispatch){
//   return {
//     increment: (value) => {dispatch(createIncreAction(value))},
//     decrement: (value) => {dispatch(createDecreAction(value))},
//     incrementAsync: (value,delayTime) => {dispatch(createIncreAsyncAction(value, delayTime))}
//   }
// }
// NOTE：简写。mapDispatchToProps也可以是对象，只需要将创建action的函数作为value，react-redux 就会自动调用dispatch方法将action分发出去（在底层API上做了优化），个人绝对这么写不好理解。
const mapDispatchToProps = {
  increment: createIncreAction,
  decrement: createDecreAction,
  incrementAsync: createIncreAsyncAction
}

// connect函数是个高阶函数（接收2个参数，都为函数，通过这两个函数，实现UI组件与redux的间接通信），它的返回值也是函数，最后会返回1个容器组件。
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);