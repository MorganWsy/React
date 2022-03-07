import React, { Component } from 'react';
// 引入antd的Button和Select组件
import { Button, Select } from 'antd';

// 引入Select组件中的Option组件
const { Option } = Select;

export default class Count extends Component {
  state = {
    value: 1,
  }

  changeHandler = (value) => {
    // 将value转成number类型
    this.setState({ value: value - 0 });
  }
  // 加法
  increment = () => {
    // 得到select中选择项的值
    const { value } = this.state;
    this.props.increment(value);
  }
  // 减法
  decrement = () => {
    const { value } = this.state;
    this.props.decrement(value);
  }
  // 如果和是奇数，则加
  incrementIfOdd = () => {
    const { value } = this.state;
    // 如果是奇数
    if(this.props.count % 2 !== 0){
      this.props.increment(value);
    }
  }
  // 异步加
  incrementAsync = () => {
    const { value } = this.state;
    this.props.incrementAsync(value, 1000);
  }
  render() {
    // console.log('UI组件接收到的props',this.props);
    return (
      <div>
        <h2>当前和为：{this.props.count}</h2>
        <Select defaultValue='1' onChange={this.changeHandler} className='count-select'>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>
        <Button type='primary' className='count-btn' onClick={this.increment}>+</Button>
        <Button type='primary' className='count-btn' onClick={this.decrement}>-</Button>
        <Button type='primary' className='count-btn' onClick={this.incrementIfOdd}>和为奇数才可加</Button>
        <Button type='primary' className='count-btn' onClick={this.incrementAsync}>异步加</Button>
      </div>
    )
  }
}
