import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Detail() {
  // NOTE：useLocation()可以获取location对象，包含search属性、state属性、pathname属性等等
  const {state:{id,title,content}} = useLocation();

  return (
    <ul className='about-message-detail-list'>
      <li>id: {id}</li>
      <li>title: {title}</li>
      <li>content: {content}</li>
    </ul>
  )
}
