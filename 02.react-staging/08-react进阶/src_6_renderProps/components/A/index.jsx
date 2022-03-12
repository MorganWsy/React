import React, { Component } from 'react';
import Count from '../Count';
import './index.css';

export default class A extends Component {
  state = {username: 'wsy', age: 20, gender: 'male'}

  render() {
    const {gender} = this.state;
    return (
      <div className='parent'>
        <h2>我是组件A</h2>
        {/* <B>
          <h3>我是组件B，我接收到的名字是{this.state.username}</h3>
          <C username={this.state.username}/>
        </B> */}
        {/* 方法2：使用render()，接收组件A和组件B传递的数据，并返回组件C(可以返回任何引入了的组件) */}
        {/* <B render={(username, age) => <C username={username} age={age} gender={gender}/>}/> */}
        <B render={(username,age) => <Count username={username} age={age} gender={gender}/>}/>
      </div>
    )
  }
}

class B extends Component {
  state = {username: 'www', age: 18}
  render() {
    const {username, age} = this.state;
    return (
      <div className='child'>
        <h2>我是组件B</h2>
        {/* <C/> */}
        {/* {this.props.children} */}

        {/* 接收传入的结构，并向组件C传入username和age数据 */}
        {this.props.render(username,age)}
      </div>
    )
  }
}

class C extends Component{
  render(){
    return (
      <div className='descendant'>
        <h2>我是组件C</h2>  
        <h3>我是组件C，我接收到了{this.props.username},{this.props.age},{this.props.gender}</h3>
      </div>
    )
  }
}


