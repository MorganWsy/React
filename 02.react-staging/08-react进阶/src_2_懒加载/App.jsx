import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
// import About from './pages/About';
// import Home from './pages/Home';
import MyNavLink from './components/MyNavLink';
import './App.less';

const Home = lazy(() => {return import('./pages/Home')});
const About = lazy(() => {return import('./pages/About')});
// 或者这么写
// const About = lazy(() => import('./pages/About'));

export default class App extends Component {
  render() {
    return (
      <div id='wrapper'>
        <Header/>
        <div className="main">
          <div className="main-left">
            <ul className="main-left-list">
              <MyNavLink to='/about'>About</MyNavLink>
              <MyNavLink to='/home'>Home</MyNavLink>
            </ul>
          </div>
          <div className="main-right">
            <div className="main-right-content">
              {/* 使用Suspense组件包裹所有路由组件，并在fallback属性中传入Home、About组件加载时的Loading组件 */}
              {/* 或<Suspense fallback={<h2>Loading...</h2>}></Suspense> */}
              <Suspense fallback={<Loading/>}>
                <Switch>
                  <Route path='/about' component={About} />
                  <Route path='/home' component={Home} />
                </Switch>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
