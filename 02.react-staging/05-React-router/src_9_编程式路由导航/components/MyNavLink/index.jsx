import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink extends Component {
  render() {
    return (
      // <NavLink activeClassName='myActive' className='list-item' {...this.props}>{this.props.children}</NavLink>
      // 进一步优化：{...this.props}会将props对象上的所有属性(包括children属性)传递给NavLink组件
      <NavLink activeClassName='myActive' className='list-item' {...this.props}/>
    )
  }
}
