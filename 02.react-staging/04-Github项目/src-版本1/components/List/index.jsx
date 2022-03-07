import React, { Component } from 'react';
// react引入图片的方式之一
// import avatar from './img/moon.jpg';
import './index.css';

export default class List extends Component {
  render() {
    const { isFirst, isLoading, err, users } = this.props;
    return (
      <ul className='list-wrapper'>
        {
          isFirst ? <h2>The results will display here.</h2>: 
          isLoading ? <h2>Loading...</h2> :
          err ? <h2 style={{color: 'red'}}>{err}</h2> :
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
