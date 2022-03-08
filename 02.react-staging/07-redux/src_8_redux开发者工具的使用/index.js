import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// 引入store对象
import store from './redux/store';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);