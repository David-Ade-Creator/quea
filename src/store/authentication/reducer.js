import Cookie from "js-cookie";
import {
  ACTIVATE_ACCOUNT_FAIL,
  ACTIVATE_ACCOUNT_REQUEST,
  USER_FORGOT_FAIL,
  USER_FORGOT_REQUEST,
  USER_FORGOT_SUCCESS,
  USER_RESET_FAIL,
  USER_RESET_REQUEST,
  USER_RESET_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "./actionType";

const initialState = {
  //signup state
  isSignupApiCalled: false,
  isSignUpSuccessful: false,
  isSignUpLoaded: false,
  signupError: null,
  //signin state
  isSigninApiCalled: false,
  isSigninSuccessful: false,
  isSigninLoaded: false,
  signinError: null,
  isAuthenticated: Cookie.getJSON("userInfo") || undefined,
  userInfo: Cookie.getJSON("userInfo") || undefined,
  //activate state
  isActivateLoaded: false,
  isActivateApiCalled: false,
  activationError: null,
  //resetpasswordlink state
  forgotPasswordSuccess: false,
  forgotPasswordLoaded: false,
  forgotPasswordApiCalled: false,
  forgotPasswordError: null,
  //resetpassword state
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        isSignUpLoaded: false,
        isSignupApiCalled: true,
        signupError: null,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isSignUpSuccessful: true,
        isSignUpLoaded: true,
        isSignupApiCalled: true,
        signupError: null,
      };
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        isSignUpLoaded: true,
        isSignupApiCalled: true,
        signupError: action.payload,
      };
    case ACTIVATE_ACCOUNT_REQUEST:
      return {
        ...state,
        isActivateLoaded: false,
        isActivateApiCalled: true,
        activationError: null,
      };
    case ACTIVATE_ACCOUNT_FAIL:
      return {
        ...state,
        isActivateLoaded: true,
        isActivateApiCalled: true,
        activationError: action.payload,
      };
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        isSigninLoaded: false,
        isSigninApiCalled: true,
        signinError: null,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        isSigninSuccessful: true,
        isSigninLoaded: true,
        isSigninApiCalled: true,
        signinError: null,
      };
    case USER_SIGNIN_FAIL:
      return {
        ...state,
        isSigninLoaded: true,
        isSigninApiCalled: true,
        signinError: action.payload,
      };
    case USER_FORGOT_REQUEST:
      return {
        ...state,
        forgotPasswordLoaded: false,
        forgotPasswordApiCalled: true,
        forgotPasswordError: null,
      };
      case USER_FORGOT_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: true,
        forgotPasswordLoaded: true,
        forgotPasswordApiCalled: true,
        forgotPasswordError: null,
      };
    case USER_FORGOT_FAIL:
      return {
        ...state,
        forgotPasswordLoaded: true,
        forgotPasswordApiCalled: true,
        forgotPasswordError: action.payload,
      };
    case USER_RESET_REQUEST:
      return {
        ...state,
        resetPasswordLoaded: false,
        resetPasswordApiCalled: true,
        resetPasswordError: null,
      };
      case USER_RESET_SUCCESS:
      return {
        ...state,
        resetPasswordLoaded: true,
        resetPasswordApiCalled: true,
        resetPasswordError: null,
      };
    case USER_RESET_FAIL:
      return {
        ...state,
        resetPasswordLoaded: true,
        resetPasswordApiCalled: true,
        resetPasswordError: action.payload,
      };
    default:
      return state;
  }
};
