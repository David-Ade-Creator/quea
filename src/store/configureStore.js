import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import { rootReducer } from "./rootReducer";

export const history = createBrowserHistory();
const middlewares = [routerMiddleware(history), thunk];

export const configureStore = () => {
    const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(...middlewares)));
    return store;
}