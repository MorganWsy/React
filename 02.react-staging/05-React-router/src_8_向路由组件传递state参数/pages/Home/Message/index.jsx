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
                  {/* 传递params参数 */}
                  {/* <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> */}

                  {/* 传递search参数 */}
                  {/* <Link to={`/home/message/detail?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}

                  {/* 传递state参数 */}
                  <Link to={{pathname: '/home/message/detail',state:{id: msgObj.id, title:msgObj.title}}}>{msgObj.title}</Link>
                </li>
              )
            })
          }
        </ul>
        {/* 注册路由。声明接收params参数，:id表示传递名为id的params参数，:title同理。 */}
        {/* <Route path='/home/message/detail/:id/:title' component={Detail}/> */}

        {/* 接收search参数，不需要声明接收，正常注册路由即可 */}
        {/* <Route path='/home/message/detail' component={Detail}/> */}

        {/* 接收state参数，不需要声明接收，正常注册路由即可 */}
        <Route path='/home/message/detail' component={Detail}/>
      </div>
    )
  }
}
