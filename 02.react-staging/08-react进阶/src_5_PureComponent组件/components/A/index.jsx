import React, { PureComponent } from 'react';
import {Button} from 'antd';
import './index.css';

export default class A extends PureComponent {
  state = {username: 'wsy', age: 20}

  handleChangeName = () => {
    this.setState({username: 'www', age: 18});
  }

  // 控制组件是否更新的钩子
  // shouldComponentUpdate(newProps,newState){
  //   // console.log(this.props,this.state);
  //   // console.log(newProps, newState);
  //   // return !(this.state.username === newState.username);
  //   let count = 0;
  //   for (const key in this.state) {
  //     if(this.state[key] !== newState[key]){
  //       count++;
  //     }
  //   }
  //   return count >= 1 ? true : false;
  // }
  render() {
    console.log('组件A渲染了~~');
    const {username} = this.state;
    return (
      <div className='parent'>
        <h2>我是组件A</h2>
        <h3>我的用户名是：{username}</h3>
        <Button type='primary' onClick={this.handleChangeName}>更改名字</Button>
        <B {...this.state}/>
      </div>
    )
  }
}

class B extends PureComponent {
  // shouldComponentUpdate(newProps,newState){
  //   // console.log(this.props);
  //   // console.log(newProps);
  //   // return !(this.props.username === newProps.username);
  //   let count = 0;
  //   for (const key in this.props) {
  //     if(this.props[key] !== newProps[key]){
  //       count++;
  //     }
  //   }
  //   return count >= 1 ? true : false;
  // }
  render() {
    console.log('组件B渲染了~~');
    return (
      <div className='child'>
        <h2>我是组件B</h2>
        <h3>我从A组件中接收到的名字是{this.props.username}，年龄是{this.props.age}</h3>
      </div>
    )
  }
}


