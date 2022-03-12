import React, { Component } from 'react'

export default class Count extends Component {
  render() {
    const {username, age, gender} = this.props;
    return (
      <div>
        <h2>我是Count组件</h2>
        <h3>我接收到的数据是{username},{age},{gender}</h3>
      </div>
    )
  }
}
