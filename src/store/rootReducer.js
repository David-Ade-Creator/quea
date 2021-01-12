import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
//import { History } from "history";

import { layoutReducer } from "./layout"
import { questionReducer } from "./question";
import { authenticationReducer } from "./authentication";
import { answerReducer } from "./answer";
import { userReducer } from "./user";

export const rootReducer = (history) => 
combineReducers({
    router: connectRouter(history),
    layout: layoutReducer,
     answer : answerReducer,
    question: questionReducer,
    authenticate: authenticationReducer,
    user: userReducer,
})