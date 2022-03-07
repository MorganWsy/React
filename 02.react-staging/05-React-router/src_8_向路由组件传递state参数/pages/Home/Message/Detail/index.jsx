import React, { Component } from 'react';

// 设置一些数据，本来应该是从数据库读取数据的
const DetailData = [
  {id: '1', content: '我爱你，中国'},
  {id: '2', content: '我爱你，位雯雯'},
  {id: '3', content: '我爱你，我未来的自己'}
];
export default class Detail extends Component {
  render() {
    // 如果state属性为undefined，则从空对象中取id和title的值，虽然都是undefined，但可以避免报错！！！
    const {id,title} = this.props.location.state || {};

    // 根据id来匹配对应的详细信息
    let res = DetailData.filter((detailObj) => {
      return detailObj.id === id;
    })[0] || {};

    return (
      <ul className='message-detail'>
        <li>id: {id}</li>
        <li>title: {title}</li>
        <li>content: {res.content}</li>
      </ul>
    )
  }
}
