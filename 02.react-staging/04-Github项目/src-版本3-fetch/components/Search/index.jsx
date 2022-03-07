import React, { Component } from 'react';
// import axios from 'axios';
import PubSub from 'pubsub-js'; 
import './index.css';

/* 
  fetch方法的特点：
    - fetch是内置于js中的，不需要使用XMLHttpRequest对象提交ajax，也不需要引入第三方库来发送ajax请求。
    - 老版本浏览器可能不支持，所以项目中用的很少！！
    - 采用了关注分离的设计思想——发送请求时，第一次返回的不是具体数据。 
*/
export default class Search extends Component {
  searchHandler = async () => {
    const { value } = this.searchInputDom;
    // 发布消息
    PubSub.publish('usersInfo',{isFirst: false, isLoading: true});
    // 点击搜索按钮时，如果搜索框内包含中文字符，则不搜索
    if(/\p{Unified_Ideograph}/u.test(value)){
      return;
    }
    //#region 使用axios发送ajax请求（axios和jQuery都是通过xhr对象来发送ajax请求的）
    // axios.get(`https://api.github.com/search/users?q=${value}`).then((response) => {
    //   // response.data.items 是个数组，包含每个用户（是对象）
    //   PubSub.publish('usersInfo',{isLoading: false, users: response.data.items});
    // }, (reason) => {
    //   // 注意：这里有个坑！err属性的值不能是reason对象，会报错。而应该是reason.message
    //   PubSub.publish('usersInfo',{isLoading: false, err: reason.message});
    // });
    //#endregion

  
    //#region 使用fetch方法发送ajax请求（未优化）
    // fetch(`https://api.github.com/search/users?q=${value}`).then((response) => {
    //   // fetch方法返回一个Promise对象，该对象不包含具体的数据，只是与请求的地址建立联系（联系成功则执行then的第一个回调，执行失则执行第二个回调，只有当网络故障或请求被阻止时才会失败，即使你请求的地址是错误的，返回的promise对象也是成功的。）
    //   // json方法可以返回一个成功的Promise对象，其值为解析response.body而得到的JSON对象
    //   console.log('联系服务器成功!');
    //   // console.log(response.json());
    //   return response.json();
    // },(err) => {
    //   console.warn('联系服务器失败!',err);  
    //   // 当网络有故障或请求被阻止时，因为默认返回undefined，所以第二个回调返回的是成功的promise，所以会执行第二个then的第一个回调。
    //   // 返回一个pending状态的promise，就可以不执行第二个then方法了！！
    //   return new Promise((resolve,reject) => {})
    // }).then((response) => {
    //   console.log('数据获取成功!',response);
    // }).catch((err) => {
    //    console.warn('出错了!',err);
    // })
    //#endregion

    //#region 使用fetch方法发送ajax请求（优化后）
    // try {
    //   const response = await fetch(`https://api.github.com/search/users?q=${value}`);
    //   const data = await response.json();
    //   PubSub.publish('usersInfo',{isLoading: false, users: data.items});
    // } catch (error) {
    //   PubSub.publish('usersInfo',{isLoading: false, err: error.message});
    // }
    //#endregion
  }

  keyupHandler = () => {
    const {value} = this.searchInputDom;
    // 如果输入框清空了，则重置状态
    if(!value){
      PubSub.publish('usersInfo',{isFirst: true, isLoading: false, err: '', users: []});
    }
    // 判断是否有输入中文，有中文则提示错误
    if(/\p{Unified_Ideograph}/u.test(value)){
      this.tipDom.style.display = 'block';
    }else{
      this.tipDom.style.display = 'none';
    }
  }
  render() {
    return (
      <div className='search-wrapper'>
        <div className='search'>
          <h2>Search GitHub Users</h2>
          <input className='search-input' type="text" ref={(dom) => { this.searchInputDom = dom }} onKeyUp={this.keyupHandler} placeholder='enter the name you search' />
          <button className='search-btn' onClick={this.searchHandler}>Search</button>
        </div>
        <p style={{display: 'none', color: 'red', padding: '0.5rem'}} ref={(dom) => { this.tipDom = dom }}>
          不可输入中文
        </p>
      </div>
    )
  }
}
