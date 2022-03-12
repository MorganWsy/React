import React, {Component} from 'react';
import { Button } from 'antd';

export default class Count extends Component{
  state = {
    count: 0
  }
  handleAddOne = () => {
    /* setState()的第一种用法： */
    // const {count} = this.state;, () => {
    //   console.log(this.state.count);
    // });
    // this.setState({count: count+1};

    /* setState()的第二种用法： 第一个参数为函数（默认接收两个参数：state、props），返回值是状态改变对象！*/
    this.setState((state,props) => {
      return {count: state.count+1};
    });
  }
  render(){
    const {count} = this.state;
    return (
      <>
        <h2>当前值为：{count}</h2>
        <Button type='primary' onClick={this.handleAddOne}>+1</Button>
      </>
    )
  }
}

