/* 
  Count组件的容器组件，用于Count的UI组件与redux的间接通信。
  - 目的：让UI组件只负责页面渲染，而容器组件负责与redux直接通信。
  - 注意：并不是在容器组件中引入store对象，而是App.jsx文件中引入，并将store对象作为容器组件的props属性传递。
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Select } from 'antd';
import {
  createIncreAction,
  createDecreAction,
  createIncreAsyncAction
} from '../../redux/count-action';

/* UI组件 */
// 引入Select组件中的Option组件
const { Option } = Select;
class Count extends Component {
  state = {
    // 默认值应该是1，与Select组件的fefaultValue的值一致（他俩的类型也一致）
    value: 1,
  }

  changeHandler = (value) => {
    // 将value转成number类型
    this.setState({ value });
  }
  increment = () => {
    const { value } = this.state;
    this.props.increment(value);
  }
  decrement = () => {
    const { value } = this.state;
    this.props.decrement(value);
  }
  incrementIfOdd = () => {
    const { value } = this.state;
    // 如果是奇数
    if (this.props.count % 2 !== 0) {
      this.props.increment(value);
    }
  }
  incrementAsync = () => {
    const { value } = this.state;
    this.props.incrementAsync(value, 1000);
  }
  render() {
    return (
      <div>
        <h2>当前和为：{this.props.count}</h2>
        <Select defaultValue={1} onChange={this.changeHandler} className='count-select'>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
        </Select>
        <Button type='primary' className='count-btn' onClick={this.increment}>+</Button>
        <Button type='primary' className='count-btn' onClick={this.decrement}>-</Button>
        <Button type='primary' className='count-btn' onClick={this.incrementIfOdd}>和为奇数才+</Button>
        <Button type='primary' className='count-btn' onClick={this.incrementAsync}>异步+</Button>
      </div>
    )
  }
}

/* 容器组件 */
/* 
  - mapStateToProps函数负责将redux中的状态传递给UI组件；
  - 接收1个参数，该参数就是store.getState()得到的值（由react-redux帮我们调用）
  - 返回1个对象，也必须是对象！该对象的key就映射为UI组件的props属性的key，该对象的value就映射为UI组件的props属性的value；
  - 函数的名字是react-redux提供的，也可以取其他名字。
*/
// NOTE：简写。函数返回的是1个对象时，需要用()括起来，不然js会认为{}是代码块。
const mapStateToProps = state => ({ count: state });

/* 
  - mapDispatchToProps函数负责将redux中操作状态的方法传递给UI组件；
  - 接收1个参数，该参数就是store.dispatch函数；
  - 返回1个对象，也必须是对象！该对象的key会被映射为UI组件的props属性的key，该对象的value会被映射会UI组件的props属性的value；
  - 函数的名字是react-redux提供的，也可以取其他名字。
*/
// NOTE：简写。mapDispatchToProps也可以是对象，只需要将创建action的函数作为value，react-redux 就会自动调用dispatch方法将action分发出去（在底层API上做了优化），个人绝对这么写不好理解。
const mapDispatchToProps = {
  increment: createIncreAction,
  decrement: createDecreAction,
  incrementAsync: createIncreAsyncAction
}

// connect函数是个高阶函数（接收2个参数，都为函数，通过这两个函数，实现UI组件与redux的间接通信），它的返回值也是函数，最后会返回1个容器组件。
export default connect(mapStateToProps, mapDispatchToProps)(Count);