import React, { Component } from 'react';
import './index.css';

export default class Item extends Component {
  // 初始化状态（默认鼠标没有移入Item项）
  state = { mouseEnter: false }

  // 根据鼠标移入和移出事件传入的值，来更改状态
  mouseHandler = (flag) => {
    return () => {
      this.setState({ mouseEnter: flag });
    }
  }
  // 勾选checkbox时更新状态
  checkboxHandler = (id) => {
    return (event) => {
      // console.log(event.target.checked);
      this.props.updateTodo(id);
    }
  }

  // 删除按钮的处理函数（不能直接在onClick={}中调用this.props.deleteTodo(id)，会报错）
  deleteHandler = (id) => {
    return () => {
      this.props.deleteTodo(id);
    }
  }
  /* checkbox元素中最好不要用defaultChecked属性，它只在初始化checkbox元素的时候生效，即只起作用一次 */
  render() {
    const { id, name, done } = this.props;
    const { mouseEnter } = this.state;
    return (
      <li style={{ backgroundColor: mouseEnter ? '#ddd' : '#fff' }} onMouseEnter={this.mouseHandler(true)} onMouseLeave={this.mouseHandler(false)}>
        <label>
          <input type="checkbox" checked={done} onChange={this.checkboxHandler(id)} />
          <span>{name}</span>
        </label>
        <button className="btn btn-danger" onClick={this.deleteHandler(id)} style={{ display: mouseEnter ? 'block' : 'none' }}>删除</button>
      </li>
    );
  }
}
