import React, { Component } from 'react';
import './index.css';

/* 目的：从A组件向C组件传递数据。 */
// 全局定义context容器对象
const MyContext = React.createContext();

export default class A extends Component {
  state = {username: 'wsy', age: 20}
  render() {
    const {username, age} = this.state;
    return (
      <div className='parent'>
        <h2>我是组件A</h2>
        <h3>我的用户名是：{username}</h3>
        <MyContext.Provider value={{username: username,age: age}}>
          <B />
        </MyContext.Provider>
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div className='child'>
        <h2>我是组件B</h2>
        <C />
      </div>
    )
  }
}

// class C extends Component {
//   // 组件C声明接收，否则组件C的context属性为空
//   static contextType = MyContext;
//   render() {
//     console.log(this);
//     return (
//       <div className='descendant'>
//         <h2>我是组件C</h2>
//         <h3>我从A组件接收到的用户名是{this.context.username}，年龄是{this.context.age}</h3>
//       </div>
//     )
//   }
// }

function C(){
  return (
    <div className='descendant'>
      <h2>我是组件C</h2>  
      <MyContext.Consumer>
        {
          (value) => {
            // console.log(value);// 就是祖先组件传递的数据
            return <h3>我从组件A接收到的用户名是{value.username}，年龄是{value.age}</h3>
          }
        }
      </MyContext.Consumer>
    </div>
  )
}

