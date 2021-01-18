import Axios from "axios";
import {baseUrl} from "../baseUrl";
const {
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_SAVE_REQUEST,
  QUESTION_SAVE_SUCCESS,
  QUESTION_SAVE_FAIL,
  QUESTION_DETAIL_FAIL,
  QUESTION_DETAIL_SUCCESS,
  QUESTION_DETAIL_REQUEST,
} = require("./actionTypes");

function questionsRequest() {
  return { type: QUESTION_LIST_REQUEST };
}

function questionRequestSuccess(questions) {
  return { type: QUESTION_LIST_SUCCESS, payload: questions };
}

function questionRequestFailed(error) {
  return { type: QUESTION_LIST_FAIL, payload: error };
}

export const listquestion = (force) => async (dispatch, getState) => {
  const { question } = getState();
  if (!force && question.isInitialized) return;
  dispatch(questionsRequest());
  try {
    const { data } = await Axios.get(`${baseUrl}/api/q3/question`);
    dispatch(questionRequestSuccess(data));
    
  } catch (error) {
    dispatch(questionRequestFailed(error.response.data.errors));
  }
};

function questionSaveRequest () {
  return { type: QUESTION_SAVE_REQUEST}
};

function questionSaveSuccess (question) {
  return { type: QUESTION_SAVE_SUCCESS ,payload: question }
};

function questionSaveFailed (error) {
  return { type: QUESTION_SAVE_FAIL ,payload: error }
};

export const savequestion = (question) => async (dispatch) => {
  console.log(question)
  dispatch(questionSaveRequest());
  try {
    const response = await Axios.post(`${baseUrl}/api/q3/question`, question);
    dispatch(questionSaveSuccess(response.data));
  } catch (error) {
    console.log("CATCH = ", error.response);
    dispatch(questionSaveFailed());
  }
};

function questionDetailRequest () {
  return { type: QUESTION_DETAIL_REQUEST}
};

function questionDetailSuccess (question) {
  return { type: QUESTION_DETAIL_SUCCESS ,payload: question }
};

function questionDetailFailed () {
  return { type: QUESTION_DETAIL_FAIL }
};

export const questionDetails = (questionId) => async (dispatch, getState) => {
  const { question } = getState();

  dispatch(questionDetailRequest());
  try {
    if (question.isInitialized){
    const data =  await question.questions.find(
      (singleQuestion) => singleQuestion._id === questionId
    );
    dispatch(questionDetailSuccess(data));
  } else {
    const { data } =  await Axios.get(`${baseUrl}/api/q3/question/${questionId}`);
    dispatch(questionDetailSuccess(data));
  }
  } catch (error) {

    dispatch(questionDetailFailed());
  }
};