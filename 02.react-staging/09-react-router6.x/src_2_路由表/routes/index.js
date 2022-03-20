import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";

// 定义并导出路由表
export const routesTable = [
  {path: '/home', element: <Home/>},
  {path: '/about', element: <About/>},
  {path: '/', element: <Navigate to='/home'/>}
];