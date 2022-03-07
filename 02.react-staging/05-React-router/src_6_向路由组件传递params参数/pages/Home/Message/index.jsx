import React, { Component } from 'react'
import { Link,Route } from 'react-router-dom';
import Detail from './Detail';

export default class Message extends Component {
  state = {
    msgArr: [
      { id: '1', title: 'message1' },
      { id: '2', title: 'message2' },
      { id: '3', title: 'message3' }
    ]
  }
  render() {
    const { msgArr } = this.state;
    return (
      <div className='message-main'>
        <ul className='message-nav-list'>
          {
            msgArr.map((msgObj) => {
              return (
                <li key={msgObj.id}>
                  <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
                </li>
              )
            })
          }
        </ul>
        {/* 注册路由。:id表示传递名为id的params参数，:title同理。此时Detail组件的props属性包含我们传递的params参数 */}
        <Route path='/home/message/detail/:id/:title' component={Detail}/>
      </div>
    )
  }
}
