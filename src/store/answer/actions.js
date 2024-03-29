import io from 'socket.io-client';
import {
  baseUrl
} from "../baseUrl";

const socket = io(baseUrl);

const {
  ANSWER_LIST_REQUEST,
  ANSWER_LIST_FAIL,
  ANSWER_SAVE_FAIL,
  ANSWER_SAVE_SUCCESS,
  ANSWER_SAVE_REQUEST,
  ANSWER_LIST_SUCCESS,
  LIKEUNLIKE_ANSWER,
} = require("./actionTypes");

function answersListRequest() {
  return {
    type: ANSWER_LIST_REQUEST
  };
}

function answerListSaveSuccess(answers) {
  return {
    type: ANSWER_LIST_SUCCESS,
    payload: answers
  };
}

function answersListRequestFailed(error) {
  return {
    type: ANSWER_LIST_FAIL,
    payload: error
  };
}

export const listAnswers = () => async (dispatch) => {
  dispatch(answersListRequest());
  try {
    socket.emit("answer list output");
      socket.on("Output Answerlist", data => {
        dispatch(answerListSaveSuccess(data))
      });
  } catch (error) {
    dispatch(answersListRequestFailed(error.response.data.errors));
  }
};

export const answers = () => async (dispatch) => {
  try {
      socket.on("Output Answerlist", data => {
        dispatch(answerSaveSuccess(data))
      });
  } catch (error) {
    dispatch(answersListRequestFailed(error.response.data.errors));
  }
};

function answerSaveRequest() {
  return {
    type: ANSWER_SAVE_REQUEST
  };
}

function answerSaveSuccess(answer) {
  return {
    type: ANSWER_SAVE_SUCCESS,
    payload: answer
  };
}

function answerSaveFailed(error) {
  return {
    type: ANSWER_SAVE_FAIL,
    payload: error
  };
}

export const saveAnswer = (answer) => async (dispatch) => {
  dispatch(answerSaveRequest());
  try {
    const sent = await socket.emit("saveAnswer", answer);
    if (sent) {
      socket.on("savedAnswerList", data => {
        dispatch(answerSaveSuccess(data));
      })
    }
  } catch (error) {
    dispatch(answerSaveFailed(error.response.data.errors));
  }
};

function likeUnlike(data) {
  return {
    type: LIKEUNLIKE_ANSWER,
    payload : data
  };
}

export const answerLike = (data) => async (dispatch) => {
  try{
    const sent = await socket.emit("answer like", data);
    if (sent) {
      socket.on("Output like", data => {
        dispatch(likeUnlike(data));
      })
    }
  } catch (error) {

  }
}