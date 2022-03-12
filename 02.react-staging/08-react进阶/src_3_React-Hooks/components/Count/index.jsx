import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Input } from 'antd';

/* 类式组件 */
// export default class Count extends Component {
//   state = { count: 0, name: 'www' }
//   handleAddOne = () => {
//     const { count } = this.state;
//     this.setState({ count: count + 1 });
//   }
//   handleChangeName = () => {
//     this.setState({ name: 'wsy' });
//   }
//   // 生命周期钩子
//   componentDidMount() {
//     this.timerId = setInterval(() => {
//       // this.setState({count: this.state.count + 1});
//       // 推荐这么写
//       this.setState(state => ({ count: state.count + 1 }));
//     }, 1000);
//   }
//   handleUnmount = () => {
//     ReactDOM.unmountComponentAtNode(document.getElementById('root'));
//     // 卸载组件后，清除所有定时器
//     clearInterval(this.timerId);
//   }
//   render() {
//     return (
//       <>
//         <h2>当前值为：{this.state.count}</h2>
//         <h2>当前名称为：{this.state.name}</h2>
//         <Button type='primary' onClick={this.handleAddOne}>+1</Button>
//         <Button type='primary' onClick={this.handleChangeName}>点我改名</Button>
//         <Button type='primary' danger onClick={this.handleUnmount}>卸载组件</Button>
//       </>
//     )
//   }
// }

/* 函数式组件：没有this；没有state，没有refs，只有props。Count组件会执行 n+1 次。 */
export default function Count() {
  // 让函数式组件也能使用state。使用数组的解构赋值，取出返回的状态和操作状态的方法（名字随便取）
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('www');
  // 与类式组件中的createRef()作用相同
  const myRef = React.useRef();
  // console.log(count, setCount);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      // 需要在定时器中获取count，否则count一直是0
      // setCount(count+1);
      // 推荐这么写
      setCount(count => count+1);
    }, 1000);
    
    // 返回的函数其实就是类式组件中的componentWillUnmount()
    return () => {
      clearInterval(timerId);
    }
  },[count]);

  function handleAddOne(){
    // 方法1：直接传入状态值
    // setCount(count+1);
    // 方法2：传入1个函数作为参数，该参数接收之前的状态，并返回更新后的状态，
    setCount((count) => {
      return count + 1;
    });
  }
  function handleChangeName(){
    // setName('wsy');
    setName((name) => {
      return 'wsy';
    });
  }

  function handleUnmount(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  }

  function handleTip(){
    // console.log(myRef);
    // alert(myRef.current.value);
    alert(myRef.current.state.value);
  }
  return (
    <>
      <h2>当前值为：{count}</h2>
      <h2>当前名称为：{name}</h2>
      {/* antd中的Input框与原生input框不同 */}
      {/* <input type="text" placeholder='随便输入' ref={myRef}/><br /> */}
      <Input placeholder='随便输入' type='text' ref={myRef} style={{width: '15rem', marginBottom: '1rem'}}/><br/>
      <Button type='primary' onClick={handleAddOne}>+1</Button>
      <Button type='primary' onClick={handleChangeName}>点我改名</Button>
      <Button type='primary' danger onClick={handleUnmount}>卸载组件</Button>
      <Button type='primary' onClick={handleTip}>提示输入框的内容</Button>
    </>
  )
}