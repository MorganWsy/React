import React, { Component } from 'react';
import PubSub from 'pubsub-js';
// react引入图片的方式之一
// import avatar from './img/moon.jpg';
import './index.css';

export default class List extends Component {
  // 初始化状态
  state = {
    users: [],
    isFirst: true,
    isLoading: false,
    err: ''
  };
  
  // 当组件挂载完毕后
  componentDidMount(){
    // 订阅消息(返回消息的标识，类似于定时器的标识)
    this.messageId = PubSub.subscribe('usersInfo', (msgName, data) => {
      // console.log(msgName);//usersInfo
      // 回调函数有两个参数，第一个是消息名，第二是传递过来的数据（回调函数不要写成function{}的形式。因为this不指向List组件）
      // 当Search组件发布名为【usersInfo】的消息时，会触发这个回调函数
      this.setState(data);
    });
  }

  // 当组件将要卸载时，取消订阅
  componentWillUnmount(){
    PubSub.unsubscribe(this.messageId);
  }

  render() {
    const { isFirst, isLoading, err, users } = this.state;
    return (
      <ul className='list-wrapper'>
        {
          isFirst ? <h2>The results will display here.</h2> :
            isLoading ? <h2>Loading...</h2> :
              err ? <h2 style={{ color: 'red' }}>{err}</h2> :
                users.map((userObj) => {
                  return (
                    <li className='list-item' key={userObj.id}>
                      <a href={userObj.html_url} rel='noreferrer' target='_blank'>
                        <img className='avatar' src={userObj.avatar_url} alt="avatar" />
                        <span className='nickname'>{userObj.login}</span>
                      </a>
                    </li>
                  )
                })
        }
      </ul>
    )
  }
}
