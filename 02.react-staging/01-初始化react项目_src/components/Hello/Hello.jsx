import React,{Component} from 'react';
// import './Hello.css';
import hello from './Hello.module.css';
// 当样式是通过原生css写的时候，不同组件的css文件如果有同名的类名或id名，会产生冲动，所以最好将css文件改名为"xxx.module.css".
// 这样就实现了css样式的模块化，然后在jsx文件中引入。如"import Hello from Hello.module.css".
// 如果是用scss或less去写，就没必要这么做了！

class Hello extends Component{
  render(){
    return (
      <div className={hello.title}>Hello，这是Hello组件!</div>
    )
  }
}
export default Hello;