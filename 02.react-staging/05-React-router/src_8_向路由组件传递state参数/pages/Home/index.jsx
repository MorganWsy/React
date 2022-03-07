import React, { Component } from 'react'
import MyNavLink from '../../components/MyNavLink'
import { Route, Switch, Redirect } from 'react-router-dom'
import News from './News'
import Message from './Message'
import './index.css'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3 className='home-main'>我是Home组件的内容</h3>
        <div>
          <ul className='home-nav-list'>
            <MyNavLink to='/home/news'>News</MyNavLink>
            <MyNavLink to='/home/message'>Message</MyNavLink>
          </ul>
          {/* 注册路由 */}
          <Switch>
            <Route path='/home/news' component={News}/>
            <Route path='/home/message' component={Message}/>
            {/* 兜底 */}
            <Redirect to='/home/news'/>
          </Switch>
        </div>
      </div>
    )
  }
}
