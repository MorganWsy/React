import React, { Component } from 'react';
import {Button} from 'antd';
import './App.less';

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>Ant-Design基本使用</h2>
        <hr />
        <Button type='primary'>按钮1</Button>
        <Button type='default'>按钮2</Button>
        <Button type='dashed'>按钮3</Button>
        <Button type='primary' danger>按钮4</Button>
      </div>
    )
  }
}
