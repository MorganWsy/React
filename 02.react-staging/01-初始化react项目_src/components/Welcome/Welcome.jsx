import React,{Component} from 'react';
// import './Welcome.css';
import welcome from './Welcome.module.css';

class Welcome extends Component{
  render(){
    return <div className={welcome.title}>Welcome，这是Welcome组件!</div>
  }
}

export default Welcome;