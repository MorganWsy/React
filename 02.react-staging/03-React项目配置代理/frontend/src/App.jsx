import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  getStudentHandler = () => {
    // 跨域问题：客户端向服务器发送ajax请求，如果域名或端口不一样，请求能发出去，但是返回的响应会被客户端拒收！！
    // 发送ajax请求。前端服务器端口为3000，后端为5000和5001
    // 代理是位于前端服务器的，所以它的端口也是3000，通过setupProxy.js文件将localhost:3000/api1/students替换成localhost:5000/students
    axios.get('http://localhost:3000/api1/students').then((response) => {
      console.log(response.data);
    },(reason) => {
      console.warn(reason);
    });
  }

  getCarHandler = () => {
    axios.get('http://localhost:3000/api2/cars').then((response) => {
      console.log(response.data);
    },(reason) => {
      console.warn(reason);
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.getStudentHandler}>点击获取学生信息</button>
        <button onClick={this.getCarHandler}>点击获取车的信息</button>
      </div>
    )
  }
}

