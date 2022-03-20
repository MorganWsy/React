import React,{useState} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

/* 实现编程式路由导航，即不依赖Link和NavLink，通过点击按钮、鼠标悬浮等实现页面跳转 */
export default function Message() {
  const [messages] = useState([
    {id: '1',title: 'title1',content: 'ILoveYouWww'},
    {id: '2', title: 'title2', content: 'YouAreSoBeautiful'},
    {id: '3', title: 'title3', content: 'ILoveYouChina'},
    {id: '4', title: 'title4', content: 'ILoveMyself'}
  ]);
  // NOTE:创建可以操作location对象的函数
  const navigate = useNavigate();
  function showDetail(msg){
    return () => {
      // '/detail'带斜杠会被当做一级路由。navigate函数接收两个参数，第一个是路径，第二个是配置项replace和state（就这两个）
      navigate('detail',{
        replace: false,
        // NOTE：目前还不能配置params和search
        state: {
          id: msg.id,
          title: msg.title,
          content: msg.content
        }
      });
    }
  }
  return (
    <div>
      <ul className='about-main-list'>
        {
          messages.map((msg) => {
            return (
              <li key={msg.id}>
                {/* NOTE：传递 state 参数，与5.x版本用法不同 */}
                <Link to='detail' state={{id: msg.id,title: msg.title,content: msg.content}}>{msg.title}</Link>
                <Button type='primary' onClick={showDetail(msg)} style={{marginLeft: '1rem'}}>查看详情</Button>
              </li>
            );
          })
        }
      </ul>
      <Outlet />
    </div>
  )
}
