import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// <React.StrictMode>表示对app组件开启严格模式（如：在app组件中使用了ref='input1'，则会有警告）
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

