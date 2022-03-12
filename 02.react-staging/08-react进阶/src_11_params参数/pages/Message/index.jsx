import React,{useState} from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Message() {
  const [messages] = useState([
    {id: '1',title: 'title1',content: 'ILoveYouWww'},
    {id: '2', title: 'title2', content: 'YouAreSoBeautiful'},
    {id: '3', title: 'title3', content: 'ILoveYouChina'},
    {id: '4', title: 'title4', content: 'ILoveMyself'}
  ]);
  return (
    <div>
      <ul className='about-main-list'>
        {
          messages.map((msg) => {
            return (
              <li key={msg.id}>
                {/* 传递params参数 */}
                <Link to={`detail/${msg.id}/${msg.title}/${msg.content}`}>{msg.title}</Link>
              </li>
            );
          })
        }
      </ul>
      <Outlet />
    </div>
  )
}
