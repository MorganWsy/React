import React, { Component } from 'react';
import Search from './components/Search';
import List from './components/List';
import './App.css';

export default class App extends Component {
  // 初始化状态
  state = {
    users: [],
    isFirst: true,
    isLoading: false,
    err: ''
  };
  // 操作状态
  // 注意：如果单独为每个属性都定义一个方法会冗余，不如让Search组件直接更新整个状态对象
  updateAppState = (stateObj) => {
    this.setState(stateObj);
  }
  render() {
    return (
      <div id='users-wrapper'>
        <Search updateAppState={this.updateAppState}/>
        <List {...this.state}/>
      </div>
    )
  }
}

