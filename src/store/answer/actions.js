import Axios from "axios";
import {baseUrl} from "../baseUrl";
const {
  ANSWER_LIST_REQUEST,
  ANSWER_LIST_FAIL,
  ANSWER_SAVE_FAIL,
  ANSWER_SAVE_SUCCESS,
  ANSWER_SAVE_REQUEST,
  ANSWER_LIST_SUCCESS,
  QUESTIONANSWER_LIST_FAIL,
  QUESTIONANSWER_LIST_SUCCESS,
  QUESTIONANSWER_LIST_REQUEST,
} = require("./actionTypes");

function answersRequest() {
  return { type: ANSWER_LIST_REQUEST };
}

function answersRequestSuccess(answers) {
  return { type: ANSWER_LIST_SUCCESS, payload: answers };
}

function answersRequestFailed(error) {
  return { type: ANSWER_LIST_FAIL, payload: error };
}

export const listAnswers = () => async (dispatch, getState) => {
  dispatch(answersRequest());
  try {
    const { data } = await Axios.get(`${baseUrl}/api/q3/answer`);
    dispatch(answersRequestSuccess(data));
  } catch (error) {
    dispatch(answersRequestFailed(error.response.data.errors));
  }
};

function answerSaveRequest() {
  return { type: ANSWER_SAVE_REQUEST };
}

function answerSaveSuccess(answer) {
  return { type: ANSWER_SAVE_SUCCESS, payload: answer };
}

function answerSaveFailed(error) {
  return { type: ANSWER_SAVE_FAIL, payload: error };
}

export const saveAnswer = (answer) => async (dispatch) => {
  dispatch(answerSaveRequest());
  try {
    const { data } = await Axios.post(`${baseUrl}/api/q3/answer`, answer);
    dispatch(answerSaveSuccess(data));
  } catch (error) {
    dispatch(answerSaveFailed(error.response.data.errors));
  }
};

function questionAnswersListRequest() {
  return { type: QUESTIONANSWER_LIST_REQUEST };
}

function questionAnswersListSuccess(answer) {
  return { type: QUESTIONANSWER_LIST_SUCCESS, payload: answer };
}

function questionAnswersListFailed(error) {
  return { type: QUESTIONANSWER_LIST_FAIL, payload: error };
}

export const questionAnswers = (questionId) => async (dispatch, getState) => {
  const { answer } = getState();
  
  dispatch(questionAnswersListRequest());
  try {
    if (answer.answersIsinitialized) {
      const data = await answer.answers.filter(
        (answer) => answer.questionId === questionId
      );
      dispatch(questionAnswersListSuccess(data));
    } else {
      const { data } = await Axios.get(`${baseUrl}/api/q3/questionAnswer/${questionId}`);
      dispatch(questionAnswersListSuccess(data));
    }
  } catch (error) {
    dispatch(questionAnswersListFailed("unable to load the answers"));
  }
};
