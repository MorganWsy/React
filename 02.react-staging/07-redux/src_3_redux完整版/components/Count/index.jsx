import React, { Component } from 'react';
// 引入antd的Button和Select组件
import { Button, Select } from 'antd';
import store from '../../redux/store';
import { createIncreAction, createDecreAction } from '../../redux/count_action';

// 引入Select组件中的Option组件
const { Option } = Select;

export default class Count extends Component {
  state = {
    value: 1,
  }
  componentDidMount(){
    // NOTE：监测redux中的状态的变化，只要一变化，就调用render方法刷新页面；因为redux只负责加工状态，不负责渲染页面
    store.subscribe(() => {
      // NOTE: 通过调用setState()来间接调用render，直接调用render没用
      this.setState({});
    });
  }
  changeHandler = (value) => {
    // 将value转成number类型
    this.setState({ value: value - 0 });
  }
  // 加法
  increment = () => {
    // 得到select中选择项的值
    const { value } = this.state;
    // 向store传递action对象，store再将action对象传递给reducer加工
    // store.dispatch({type: 'increment',data: value});
    store.dispatch(createIncreAction(value));
  }
  // 减法
  decrement = () => {
    const { value } = this.state;
    // store.dispatch({type: 'decrement',data: value});
    store.dispatch(createDecreAction(value));
  }
  // 如果和是奇数，则加
  incrementIfOdd = () => {
    const { value } = this.state;
    // 如果是奇数。store.getState()用于获取加工后的状态
    if (store.getState() % 2 !== 0) {
      // store.dispatch({type: 'increment',data: value});
      store.dispatch(createIncreAction(value));
    }
  }
  // 异步加
  incrementAsync = () => {
    const { value } = this.state;
    setTimeout(() => {
      // store.dispatch({type: 'increment', data: value});
      store.dispatch(createIncreAction(value));
    }, 1000);
  }
  render() {
    return (
      <div>
        <h2>当前和为：{store.getState()}</h2>
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
