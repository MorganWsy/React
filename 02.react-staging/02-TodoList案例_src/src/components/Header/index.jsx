import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class Header extends Component {
  /* 对props属性进行类型限制。propTypes这个名称是固定的，别写错了！！ */
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }
  keyupHandler = (event) => {
    const {keyCode,target} = event;
    // 如果输入的不是回车键，则不处理
    if(keyCode !== 13) return;
    // 如果输入为空，则提示用户重新输入
    if(target.value.trim() === ''){
      alert('输入不能为空!');
      return;
    }
    // 将输入的内容传给父组件App，从而改变父组件的状态
    this.props.addTodo(target.value, false);
    // 回车后清空输入栏
    target.value = '';
  }
  render() {
    return (
      <div className="todo-header">
        <input type="text" onKeyUp={this.keyupHandler} placeholder="请输入你的任务名称，按回车键确认"/>
      </div>
    )
  }
}
