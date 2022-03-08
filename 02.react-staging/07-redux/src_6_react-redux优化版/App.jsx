import React, { Component } from "react";
// import Count from './components/Count';
// 引入Count的容器组件
import Count from './containers/Count';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="count-wrapper">
        {/* KEY: 在这里传入store对象，使容器组件与redux通信 */}
        <Count/>
      </div>
    )
  }
}

