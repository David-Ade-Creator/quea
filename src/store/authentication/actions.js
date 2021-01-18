import Axios from "axios";
import {baseUrl} from "../baseUrl";
import { push } from 'react-router-redux';
import { openNotification } from "../../Components/utils/notification";
import Cookie from 'js-cookie';
const {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  ACTIVATE_ACCOUNT_REQUEST,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_FORGOT_REQUEST,
  USER_FORGOT_SUCCESS,
  USER_FORGOT_FAIL,
  USER_RESET_REQUEST,
  USER_RESET_SUCCESS,
  USER_RESET_FAIL,
  USER_LOGOUT,
} = require("./actionType");

function signupRequest() {
  return { type: USER_SIGNUP_REQUEST };
}

function signupSuccess(data) {
  return { type: USER_SIGNUP_SUCCESS, payload: data };
}

function signupFailed(error) {
  return { type: USER_SIGNUP_FAIL, payload: error };
}

export const signup = (value) => async (dispatch, useHistory) => {
  dispatch(signupRequest());
  try {
    const { data } = await Axios.post(`${baseUrl}/api/q3/signup`, value);
    const title = "Signup successful";
    const description = data.message;
    openNotification(title, description);
    dispatch(signupSuccess(data));
    dispatch(push("/signin"));
  } catch (error) {
    //   console.log("CATCH = ", error.response);
    dispatch(signupFailed(error.response.data.errors));
  }
};

function activateAccountRequest() {
  return { type: ACTIVATE_ACCOUNT_REQUEST };
}

function activateAccountSuccess(data) {
  return { type: ACTIVATE_ACCOUNT_SUCCESS, payload: data };
}

function activateAccountFailed(error) {
  return { type: ACTIVATE_ACCOUNT_FAIL, payload: error };
}

export const activate = (token) => async (dispatch) => {
  console.log("i was called")
  dispatch(activateAccountRequest());
  try {
    const { data } = await Axios.post(`${baseUrl}/api/q3/${token}/activate`);
    const title = "Account Activated";
    const description = data.message;
    openNotification(title, description);
    dispatch(activateAccountSuccess(data));
    dispatch(push("/signin"));
  } catch (error) {
       console.log("CATCH = ", error.response);
    dispatch(activateAccountFailed(error.response.data.errors));
  }
};

function signinRequest() {
  return { type: USER_SIGNIN_REQUEST };
}

function signinSuccess(data) {
  return { type: USER_SIGNIN_SUCCESS, payload: data };
}

function signinFailed(error) {
  return { type: USER_SIGNIN_FAIL, payload: error };
}

export const signin = (value) => async (dispatch) => {
  dispatch(signinRequest());
  try {
    const { data } = await Axios.post(`${baseUrl}/api/q3/signin`, value);
    Cookie.set('userInfo', JSON.stringify(data));
    dispatch(signinSuccess(data));
    dispatch(push("/"));
  } catch (error) {
    //   console.log("CATCH = ", error.response);
    dispatch(signinFailed(error.response.data.errors));
  }
};

function forgotPasswordRequest() {
  return { type: USER_FORGOT_REQUEST };
}

function forgotPasswordSuccess(action) {
  return { type: USER_FORGOT_SUCCESS, payload: action };
}

function forgotPasswordFailed(error) {
  return { type: USER_FORGOT_FAIL, payload: error };
}

export const forgotPassword = (value) => async (dispatch) => {
  dispatch(forgotPasswordRequest());
  try {
    const { data } = await Axios.put(`${baseUrl}/api/q3/sendPasswordLink`, value);
    const title = "Password reset Email Sent";
    const description = data.message;
    openNotification(title, description);
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
       //console.log("CATCH = ", error.response);
    dispatch(forgotPasswordFailed(error.response.data.error));
  }
};

function resetPasswordRequest() {
  return { type: USER_RESET_REQUEST };
}

function resetPasswordSuccess(action) {
  return { type: USER_RESET_SUCCESS, payload: action };
}

function resetPasswordFailed(error) {
  return { type: USER_RESET_FAIL, payload: error };
}

export const resetPassword = (value) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const { data } = await Axios.put(`${baseUrl}/api/q3/resetPassword`, value);
    const title = "Password Changes";
    const description = data.message;
    openNotification(title, description);
    dispatch(resetPasswordSuccess(data));
    dispatch(push("/signin"));
  } catch (error) {
    //   console.log("CATCH = ", error.response);
    dispatch(resetPasswordFailed(error.response.data.errors));
  }
};

export const logout = () => (dispatch) => {
  console.log('i was called');
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
};


// export function initializeAuthenticationState(
//   initializedFromPath
// ){
//   return async (dispatch) => {
//       const loginRoute = "/signin";
//       const authInitialResponse = await initialize();
//       if (!authInitialResponse) {
//           dispatch(signinRequest());

//           if (initializedFromPath !== loginRoute)
//               dispatch(routerActions.push(loginRoute, { redirectedFrom: initializedFromPath }));
//           return;
//       }
//       dispatch(signinSuccess(authInitialResponse.accessToken));
//       dispatch(routerActions.push(initializedFromPath || "/"));
//   };
// }