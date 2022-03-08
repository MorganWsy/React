/* 优化：将容器组件和UI组件写在一个文件中 */
import React, { Component } from 'react'
import {Button, Select} from 'antd';
import {connect} from 'react-redux';
import {
  createIncreAction,
  createDecreAction,
  createIncreAsyncAction
} from '../../redux/actions/count';

/* UI组件 */
const {Option} = Select;  
class Count extends Component {
  state = {
    value: 1
  }
  selectChanged = (value) => {
    this.setState({value});
  }

  increHandler = () => {
    const {value} = this.state;
    this.props.increment(value);
  }
  decreHandler = () => {
    const {value} = this.state;
    this.props.decrement(value);
  }
  increIfOddHandler = () => {
    const {value} = this.state;
    if(this.props.count % 2 !== 0){
      this.props.increment(value);
    }
  }
  increAsyncHandler = () => {
    const {value} = this.state;
    this.props.incrementAsync(value, 1000);
  }
  render() {
    return (
      <div style={{marginBottom: '2rem'}}>
        <h1>这是Count组件，Person组件有{this.props.persons.length}个人</h1>
        <h2>当前求和为：{this.props.count}</h2>
        <Select defaultValue={1} className='count-select' onChange={this.selectChanged}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
        </Select>
        <Button type='primary' className='count-btn' onClick={this.increHandler}>+</Button>        
        <Button type='primary' className='count-btn' onClick={this.decreHandler}>-</Button>
        <Button type='primary' className='count-btn' onClick={this.increIfOddHandler}>和为奇数才+</Button>
        <Button type='primary' className='count-btn' onClick={this.increAsyncHandler}>异步+</Button>
      </div>
    )
  }
}

/* 容器组件 */
const mapStateToProps = (state) => ({count: state.count,persons: state.persons});
const mapDispatchToProps = (dispatch) => {
  return {
    increment: (value) => {dispatch(createIncreAction(value))},
    decrement: (value) => {dispatch(createDecreAction(value))},
    incrementAsync: (value, delayTime) => {dispatch(createIncreAsyncAction(value,delayTime))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Count);
