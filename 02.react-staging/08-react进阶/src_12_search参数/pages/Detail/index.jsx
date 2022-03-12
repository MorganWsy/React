import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'antd';

export default function Detail() {
  // 使用useSearchParams方法获取 search 参数，返回一个数组，第一项是URLSearchParams对象，第二项是修改search参数的函数
  const [search,setSearch] = useSearchParams();
  const id = search.get('id');
  const title = search.get('title');
  const content = search.get('content');

  return (
    <ul className='about-message-detail-list'>
      <Button type='primary' onClick={() => {setSearch('id=8&title=title8&content=maybe')}}>修改search参数</Button>
      <li>id: {id}</li>
      <li>title: {title}</li>
      <li>content: {content}</li>
    </ul>
  )
}
