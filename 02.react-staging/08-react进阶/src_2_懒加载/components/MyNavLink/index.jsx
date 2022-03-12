import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// 二次封装NavLink组件
export default class MyNavLink extends Component {
  render() {
    return (
      // className属性可有可无
      <NavLink activeClassName='myActive' className='list-item' {...this.props}/>
    )
  }
}
