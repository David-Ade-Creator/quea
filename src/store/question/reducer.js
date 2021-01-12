import {
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_DETAIL_FAIL,
  QUESTION_DETAIL_SUCCESS,
  QUESTION_DETAIL_REQUEST,
  QUESTION_SAVE_REQUEST,
  QUESTION_SAVE_SUCCESS,
  QUESTION_SAVE_FAIL,
} from "./actionTypes";

const initialState = {
  isInitialized: false,
  questions: [],
  error: null,
  //questionSaveState
  isQuestionSaveInitialized: false,
  isQuestionSaveError: null,
  //questionDetailsState
  questionDetailIsinitialized: false,
  question: undefined,
  questionDetailError: null,
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUESTION_LIST_REQUEST:
      return {
        ...state,
        isInitialized: false,
      };
    case QUESTION_LIST_SUCCESS:
      return {
        ...state,
        isInitialized: true,
        questions: action.payload,
      };
    case QUESTION_LIST_FAIL:
      return {
        ...state,
        isInitialized: true,
        error: action.payload,
      };
    case QUESTION_SAVE_REQUEST: 
    return {
      ...state,
      isQuestionSaveInitialized: false,
    };
    case QUESTION_SAVE_SUCCESS: 
    return {
      ...state,
      isQuestionSaveInitialized: true,
      questions: state.questions.concat(action.payload),
      isQuestionSaveError: null,
    };
    case QUESTION_SAVE_FAIL: 
    return {
      ...state,
      isQuestionSaveInitialized: true,
      isQuestionSaveError: action.payload,
    };
    case QUESTION_DETAIL_REQUEST:
      return {
        ...state,
        questionDetailIsinitialized: false,
        questionDetailError: null,
      };
    case QUESTION_DETAIL_SUCCESS:
      return {
        ...state,
        questionDetailIsinitialized: true,
        question: action.payload,
        questionDetailError: null,
      };
    case QUESTION_DETAIL_FAIL:
      return {
        ...state,
        questionDetailIsinitialized: true,
        questionDetailError: "Error loading question detail",
      };
    default:
      return state;
  }
};
