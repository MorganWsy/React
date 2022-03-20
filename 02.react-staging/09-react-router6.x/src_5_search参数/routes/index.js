import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import Message from '../pages/Message';
import Detail from "../pages/Detail";

// 定义并导出路由表
export const routesTable = [
  {
    path: '/home', 
    element: <Home/>,
  },
  {
    path: '/about', 
    element: <About/>,
    // 指定二级路由，也是个数组（每个对象就对于一个二级路由）
    children: [
      {
        // '/news'的 / 可省略
        path: 'news',
        element: <News/>
      },
      {
        path: 'message',
        element: <Message/>,
        // 定义三级路由
        children: [
          {
            // search参数不需要声明接收
            path: 'detail',
            element: <Detail/>
          }
        ]
      }
    ]
  },
  {path: '/', element: <Navigate to='/home'/>}
];