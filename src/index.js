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
reportWebVitals();
