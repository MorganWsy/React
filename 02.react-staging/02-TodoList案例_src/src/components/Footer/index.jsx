import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class Footer extends Component {
  // 对传入的props属性进行类型限制
  static propTypes = {
    checkAllTodo: PropTypes.func.isRequired,
    clearAllDone: PropTypes.func.isRequired
  }

  checkAllHandler = (event) => {
    // 根据全选的checkbox是否选中决定是全选还是全不选
    this.props.checkAllTodo(event.target.checked);
  }
  clearAllDoneHandler = () => {
    this.props.clearAllDone();
  }
  render() {
    const { todos } = this.props;
    // 获取总的任务数
    const total = todos.length;
    // 获取当前已完成的任务数
    // const doneTodo = todos.reduce((pre, current) => {
    //   return pre + (current.done ? 1 : 0);
    // }, 0)
    const doneTodo = todos.filter((todoObj) => {
      return todoObj.done === true;
    }).length;
    
    /* 如果所有任务都完成了且总任务数不等于0，则勾选'全选'checkbox */
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={total === doneTodo && total !== 0 ? true : false} onChange={this.checkAllHandler} />
        </label>
        <span>
          <span>已完成{doneTodo}</span> / 全部{total}
        </span>
        <button className="btn btn-danger" onClick={this.clearAllDoneHandler}>清除已完成任务</button>
      </div>
    )
  }
}
