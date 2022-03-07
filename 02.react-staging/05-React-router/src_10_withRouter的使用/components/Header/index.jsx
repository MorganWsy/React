import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';

/* 在普通组件中实现编程式路由跳转 */
class Header extends Component {
  back = () => {
    this.props.history.goBack();
  }

  forward = () => {
    this.props.history.goForward();
  }

  go = () => {
    this.props.history.go(2);
  }

  render() {
    console.log(this.props);
    return (
      <div className="header">
        <h2>React Router Demo</h2>
        <button onClick={this.back}>后退</button>
        <button onClick={this.forward}>前进</button>
        <button onClick={this.go}>go</button>
      </div>
    )
  }
}
// withRouter是一个函数，可以将路由组件的props属性上的API都赋给普通组件的props上，并返回一个新组件。
export default withRouter(Header);
