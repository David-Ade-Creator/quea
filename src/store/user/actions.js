import Axios from "axios";
import {
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USER_ANSWER_FAIL,
  USER_ANSWER_REQUEST,
  USER_ANSWER_SUCCESS,
  USER_PROFILE_EDIT_FAIL,
  USER_PROFILE_EDIT_REQUEST,
  USER_PROFILE_EDIT_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_QUESTION_FAIL,
  USER_QUESTION_REQUEST,
  USER_QUESTION_SUCCESS,
} from "./actionTypes";

function usersListRequest() {
  return { type: USERS_LIST_REQUEST };
}

function usersListRequestSuccess(users) {
  return { type: USERS_LIST_SUCCESS, payload: users };
}

function usersListRequestFailed(error) {
  return { type: USERS_LIST_FAIL, payload: error };
}

export const usersList = (force) => async (dispatch, getState) => {
  const { user } = getState();
  if (!force && user.isInitialized) return;

  dispatch(usersListRequest());
  try {
    const { data } = await Axios.get(`/api/q3/users`);
    dispatch(usersListRequestSuccess(data));
  } catch (error) {
    dispatch(usersListRequestFailed(error));
  }
};

function userProfileRequest() {
  return { type: USER_PROFILE_REQUEST };
}

function userProfileRequestSuccess(userData) {
  return { type: USER_PROFILE_SUCCESS, payload: userData };
}

function userProfileRequestFailed(error) {
  return { type: USER_PROFILE_FAIL, payload: error };
}

export const userProfileInfo = (userId) => async (dispatch, getState) => {
  const { user } = getState();

  dispatch(userProfileRequest());
  try {
     if (user.isInitialized){
    const userData =  await user.users.find(
      (singleUser) => singleUser._id === userId
    );
    dispatch(userProfileRequestSuccess(userData));
  } else {
    const userData  = await Axios.get(`/api/q3/users/${userId}`);
    dispatch(userProfileRequestSuccess(userData.data));
  }
  } catch (error) {

    dispatch(userProfileRequestFailed());
  }
};

function userEditRequest() {
  return { type: USER_PROFILE_EDIT_REQUEST };
}

function userEditRequestSuccess(user) {
  return { type: USER_PROFILE_EDIT_SUCCESS, payload: user };
}

function userEditRequestFailed(error) {
  return { type: USER_PROFILE_EDIT_FAIL, payload: error };
}

export const userEdit = (userDetail) => async (dispatch) => {
  dispatch(userEditRequest());
  try {
    const { data } = await Axios.put(
      `/api/q3/users/${userDetail.userId}`,
      userDetail
    );
    dispatch(userEditRequestSuccess(data));
  } catch (error) {
    dispatch(userEditRequestFailed());
  }
};

function userQuestionRequest() {
  return { type: USER_QUESTION_REQUEST };
}

function userQuestionRequestSuccess(questions) {
  return { type: USER_QUESTION_SUCCESS, payload: questions };
}

function userQuestionRequestFailed(error) {
  return { type: USER_QUESTION_FAIL, payload: error };
}

export const userQuestions = (userId) => async (dispatch, getState) => {
  const { question } = getState();
  dispatch(userQuestionRequest());
  try {
    if (question.questions) {
      const data = await question.questions.filter(
        (singleQuestion) => singleQuestion.writer._id === userId
      );
      dispatch(userQuestionRequestSuccess(data));
    } else {
      const { data } = await Axios.get(`/api/q3/users/${userId}/questions`);
      dispatch(userQuestionRequestSuccess(data));
    }
  } catch (error) {
    dispatch(userQuestionRequestFailed());
  }
};

function userAnswerRequest() {
  return { type: USER_ANSWER_REQUEST };
}

function userAnswerRequestSuccess(answers) {
  return { type: USER_ANSWER_SUCCESS, payload: answers };
}

function userAnswerRequestFailed(error) {
  return { type: USER_ANSWER_FAIL, payload: error };
}

export const userAnswers = (userId) => async (dispatch, getState) => {
  const { answer } = getState();
  dispatch(userAnswerRequest());
  try {
    if (answer.answers) {
      const data = await answer.answers.find(
        (singleAnswer) => singleAnswer.writer._id === userId
      );
      dispatch(userAnswerRequestSuccess(data));
    } else {
      const { data } = await Axios.get(`/api/q3/users/${userId}/answers`);
      dispatch(userAnswerRequestSuccess(data));
    }
  } catch (error) {
    dispatch(userAnswerRequestFailed());
  }
};
