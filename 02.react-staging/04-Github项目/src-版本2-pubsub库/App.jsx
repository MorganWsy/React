import React, { Component } from 'react';
import Search from './components/Search';
import List from './components/List';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div id='users-wrapper'>
        <Search/>
        <List/>
      </div>
    )
  }
}

