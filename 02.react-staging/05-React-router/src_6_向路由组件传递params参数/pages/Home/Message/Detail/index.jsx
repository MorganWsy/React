import React, { Component } from 'react'

// 设置一些数据，本来应该是从数据库读取数据的
const DetailData = [
  {id: '1', content: '我爱你，中国'},
  {id: '2', content: '我爱你，位雯雯'},
  {id: '3', content: '我爱你，我未来的自己'}
];
export default class Detail extends Component {
  render() {
    const {params} = this.props.match;

    // 根据id来匹配对应的详细信息
    let res = DetailData.filter((detailObj) => {
      return detailObj.id === params.id;
    })[0];
    
    return (
      <ul className='message-detail'>
        <li>id: {params.id}</li>
        <li>title: {params.title}</li>
        <li>content: {res.content}</li>
      </ul>
    )
  }
}
