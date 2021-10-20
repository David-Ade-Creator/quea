import {
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_QUESTION_REQUEST,
  USER_QUESTION_SUCCESS,
  USER_QUESTION_FAIL,
  USER_ANSWER_REQUEST,
  USER_ANSWER_SUCCESS,
  USER_ANSWER_FAIL,
  USER_PROFILE_EDIT_REQUEST,
  USER_PROFILE_EDIT_SUCCESS,
  USER_PROFILE_EDIT_FAIL
} from "./actionTypes";

const initialState = {
  isInitialized: false,
  users: [],
  error: null,
  //user profile state
  isUserProfileInitialized: false,
  userProfile: undefined,
  userProfileError: null,
  // user questions state
  isUserQuestionsInitialized: false,
  userQuestions: [],
  userQuestionsError: null,
  // user answers state
  isUserAnswersInitialized: false,
  userAnswers: [],
  userAnswersError: null,
  // user edit state
  isApiLoading: false,
  userEditError: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return {
        ...state,
        isInitialized: false,
      };
    case USERS_LIST_SUCCESS:
      return {
        ...state,
        isInitialized: true,
        users: action.payload,
      };
    case USERS_LIST_FAIL:
      return {
        ...state,
        isInitialized: true,
        error: action.payload,
      };
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        isUserProfileInitialized: false,
        userProfileError: null,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        isUserProfileInitialized: true,
        userProfile: action.payload,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        isUserProfileInitialized: true,
        userProfileError: action.payload,
      };
    case USER_QUESTION_REQUEST:
      return {
        ...state,
        isUserQuestionsInitialized: false,
        userQuestionsError: null,
      };
    case USER_QUESTION_SUCCESS:
      return {
        ...state,
        isUserQuestionsInitialized: true,
        userQuestions: action.payload,
      };
    case USER_QUESTION_FAIL:
      return {
        ...state,
        isUserQuestionsInitialized: true,
        userQuestionsError: action.payload,
      };
      case USER_ANSWER_REQUEST:
        return {
          ...state,
          isUserAnswersInitialized: false,
          userAnswersError: null,
        };
      case USER_ANSWER_SUCCESS:
        return {
          ...state,
          isUserAnswersInitialized: true,
          userAnswers: action.payload,
        };
      case USER_ANSWER_FAIL:
        return {
          ...state,
          isUserAnswersInitialized: true,
          userAnswersError: action.payload,
        };

        case USER_PROFILE_EDIT_REQUEST:
        return {
          ...state,
          isApiLoading : true,
          userAnswersError: null,
        };
      case  USER_PROFILE_EDIT_SUCCESS:
        return {
          ...state,
          isApiLoading : false,
          userProfile: action.payload,
        };
      case USER_PROFILE_EDIT_FAIL:
        return {
          ...state,
          isApiLoading : false,
          userEditError: action.payload,
        };
    default:
      return state;
  }
};
