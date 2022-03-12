import React, { Component } from 'react';
import './index.css';

export default class A extends Component {
  state = {hasError: ''}
  
  // NOTE：这是静态方法，默认接收错误信息，并返回包含错误信息的状态对象
  static getDerivedStateFromError(error){
    console.log('@@@',error);
    return {hasError: error};
  }

  // NOTE: 使用componentDidCatch()捕获错误，进行统计，并向后台反馈错误，告知开发人员及时处理错误。
  componentDidCatch(error, info){
    console.warn('组件渲染出错！');
    console.log(error,info);
  }
  render() {
    return (
      <div className='parent'>
        <h2>我是组件A</h2>
        <B hasError={this.state.hasError}/>
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div className='child'>
        <h2>我是组件B</h2>
        {
          // 判断子组件是否出错，出错了则用备用组件替换子组件，从而防止错误展示在页面上或防止错误扩散导致所有组件都不显示
          this.props.hasError ? <h2>当前网络不稳定，请稍后再试</h2> : <C />
        }
      </div>
    )
  }
}

class C extends Component{
  state = {
    // users: [
    //   {id: '1', name: 'www', age: 20},
    //   {id: '2', name: 'wsy', age: 20},
    //   {id: '3', name: 'wzy', age: 21}
    // ]
    users: 'abc'
  }
  render(){
    return (
      <div className='descendant'>
        <h2>我是组件C</h2>  
        <ul style={{fontSize: '14px',listStyle: 'inside'}}>
          {
            this.state.users.map((user) => {
              return <li key={user.id}>我是{user.name}，我{user.age}岁</li>;
            })
          }
        </ul>
      </div>
    )
  }
}


