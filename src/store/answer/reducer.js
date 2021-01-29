import {
  ANSWER_LIST_FAIL,
  ANSWER_LIST_REQUEST,
  ANSWER_LIST_SUCCESS,
  ANSWER_SAVE_FAIL,
  ANSWER_SAVE_REQUEST,
  ANSWER_SAVE_SUCCESS,
  LIKEUNLIKE_ANSWER,
  QUESTIONANSWER_LIST_FAIL,
  QUESTIONANSWER_LIST_REQUEST,
  QUESTIONANSWER_LIST_SUCCESS,
} from "./actionTypes";

const initialState = {
  answersIsinitialized: false,
  answers: [],
  answersError: null,
  // answers state for selected question
  questionAnswersIsinitialized: false,
  questionAnswers: [],
  questionAnswersError: null,
  // answers state for saving answer
  isSaveAnswerInitialized: false,
  isAnswerSaved:false,
  answerSaveError: null,
};

export const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ANSWER_LIST_REQUEST:
      return {
        ...state,
        answersError: null,
      };
    case ANSWER_LIST_SUCCESS:
      return {
        ...state,
        answersIsinitialized: true,
        answers: action.payload,
        answersError: null,
      };
    case ANSWER_LIST_FAIL:
      return {
        ...state,
        answersIsinitialized: true,
        answersError: action.payload,
      };
    case QUESTIONANSWER_LIST_REQUEST:
      return {
        ...state,
        questionAnswersIsinitialized: false,
        questionAnswers:[]
      };
    case QUESTIONANSWER_LIST_SUCCESS:
      return {
        ...state,
        questionAnswersIsinitialized: true,
        questionAnswers: action.payload,
        questionAnswersError: null,
      };
    case QUESTIONANSWER_LIST_FAIL:
      return {
        ...state,
        questionAnswersIsinitialized: true,
        questionAnswersError: action.payload,
      };
    case ANSWER_SAVE_REQUEST:
      return {
        ...state,
        isSaveAnswerInitialized: false,
        answerSaveError: null,
      };
    case ANSWER_SAVE_SUCCESS:
      return {
        ...state,
        isSaveAnswerInitialized: true,
        isAnswerSaved:true,
        questionAnswers: action.payload,
        answerSaveError: null,
      };
    case ANSWER_SAVE_FAIL:
      return {
        ...state,
        isSaveAnswerInitialized: true,
        answerSaveError: action.payload,
      };

    case LIKEUNLIKE_ANSWER: 
    return {
      ...state,
      answers : action.payload
    }
    default:
      return state;
  }
};
