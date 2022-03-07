import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

export default class Search extends Component {
  searchHandler = () => {
    const { value } = this.searchInputDom;
    this.props.updateAppState({isFirst: false, isLoading: true});
    if(/\p{Unified_Ideograph}/u.test(value)){
      return;
    }
    // 使用了github对外提供的接口（有时候请求过多可能没反应）
    axios.get(`https://api.github.com/search/user?q=${value}`).then((response) => {
      // response.data.items 是个数组，包含每个用户（是对象）
      this.props.updateAppState({isLoading: false, users: response.data.items});
    }, (reason) => {
      // 注意：这里有个坑！err属性的值不能是reason对象，会报错。而应该是reason.message
      this.props.updateAppState({isLoading: false, err: reason.message});
    });
  }

  keyupHandler = () => {
    const {value} = this.searchInputDom;
    // 如果输入框清空了，则重置状态
    if(!value){
      this.props.updateAppState({isFirst: true, isLoading: false, err: '', users: []});
    }
    // 判断是否有输入中文
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
