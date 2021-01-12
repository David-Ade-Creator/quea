import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore, history } from "./store/configureStore";

const store = configureStore()

ReactDOM.render(
  //TODO: Disabled due to the error in the antd library https://github.com/ant-design/ant-design/issues/22493
  //<React.StrictMode>
    <App store={store} history={history} />,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
