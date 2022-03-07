// {xxx}表示xxx对象是通过普通导出方式导出的(export xxx)，而不是默认导出(export deafult xxx)!!!
// App.jsx相当于所有组件的容器，其他组件在这个文件中引入。
import React,{Component} from 'react';
import Hello from './components/Hello/Hello';
import Welcome from './components/Welcome/Welcome';

class App extends Component{
  render(){
    return (
      <div>
        <Hello></Hello>
        <Welcome></Welcome>
      </div>
    )
  }
}

export default App;