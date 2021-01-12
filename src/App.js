import React from "react";
import { Provider } from "react-redux";
//import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

function App({ store, history }) {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
