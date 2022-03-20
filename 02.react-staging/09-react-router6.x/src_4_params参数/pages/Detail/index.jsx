import React from 'react';
import { useParams,useMatch } from 'react-router-dom';

export default function Detail() {
  // 使用useParams方法获取params参数
  const {id,title,content} = useParams();
  // 使用useMatch方法可以拿到match对象，需要传入完整的路由地址，用的不多！
  // const a = useMatch('about/message/detail/:id/:title/:content');
  // console.log(a);

  return (
    <ul className='about-message-detail-list'>
      <li>id：{id}</li>
      <li>title：{title}</li>
      <li>content：{content}</li>
    </ul>
  )
}
