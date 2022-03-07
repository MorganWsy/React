import React, { Component } from 'react';
// 第三方库，用来生成唯一值id（每次使用nanoid()所产生的值都不一样）
import { nanoid } from 'nanoid';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';
import './App.css';

export default class App extends Component {
  // 状态在哪里，修改状态的方法就在哪里！！！
  // 在父组件App中初始化状态，并通过props将状态传到List组件中
  state = {
    todos: [
      { id: 1, name: '学完react', done: true },
      { id: 2, name: '学完nodejs', done: false },
      { id: 3, name: '看完es6语法', done: false },
      { id: 4, name: '学习Promise', done: false }
    ]
  }

  // 添加一个新任务
  addTodo = (name, done) => {
    // 获得原始状态
    const { todos } = this.state;
    // 设置数据
    let todoObj = {
      // 不能用数组的长度来计算唯一值，因为当我们删除任意一项时，再添加一项新的，可能会出现重复的id
      // id: todos.length+1,
      id: nanoid(),
      name,
      done
    }
    // 更新状态（将新任务添加到最前面）
    this.setState({ todos: [todoObj, ...todos] });
  };
  // 更新任务（根据任务的id匹配。因为App组件和Item组件是祖孙关系，所以需要将updateTodo方法通过props传递给List组件，再通过List组件的props将它传给Item组件使用）
  updateTodo = (id) => {
    const { todos } = this.state;
    // 判断当前更新的是哪个todo项，并更新该todo项的done属性
    const newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) {
        todoObj.done = !todoObj.done;
        return todoObj;
      } else {
        return todoObj;
      }
    });
    // 更新状态
    this.setState({ todos: newTodos });
  }

  // 全选/全不选checkbox
  checkAllTodo = (done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todoObj) => {
      // 如果todoObj的done属性与传入的done属性的值不同，则修改为传入的done值，并返回新的todoObj！！！
      return { ...todoObj, done: done }
    });
    this.setState({ todos: newTodos });
  }
  // 删除一个任务（方法名不要用delete，它是关键字）
  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodos = todos.filter((todoObj) => {
      return todoObj.id !== id;
    });
    this.setState({ todos: newTodos });
  }
  // 清除所有已完成的任务
  clearAllDone = () => {
    const { todos } = this.state;
    const newTodos = todos.filter((todoObj) => {
      return todoObj.done === false;
    });
    this.setState({todos: newTodos});
  }
  render() {
    const { todos } = this.state;
    return (
      <div className='todo-container'>
        <div className='todo-wrap'>
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
          <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/>
        </div>
      </div>
    );
  }
}
