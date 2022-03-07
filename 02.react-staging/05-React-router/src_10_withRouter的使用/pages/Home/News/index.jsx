import React, { Component } from 'react'

export default class News extends Component {
  // 借助编程式路由导航，可以实现在n秒后跳转到指定路由
  componentDidMount = () => {
    setTimeout(() => {
      this.props.history.push('/home/message');
    }, 2000);
  }
  render() {
    return (
      <ul>
        <li>news1</li>
        <li>news2</li>
        <li>news3</li>
      </ul>
    )
  }
}
