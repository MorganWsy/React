import React, { Component } from "react";
import Count from './components/Count';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="count-wrapper">
        <Count />
      </div>
    )
  }
}

