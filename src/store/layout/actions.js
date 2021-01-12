import {
  HIDE_ANSWER_MODAL,
  SHOW_ANSWER_MODAL,
  SHOW_MENU_DRAWER,
  HIDE_MENU_DRAWER,
  HIDE_QUESTION_MODAL,
  SHOW_QUESTION_MODAL,
} from "./actionType";

export const hideAnswerModal = () => (dispatch) => {
  dispatch({ type: HIDE_ANSWER_MODAL });
};

export const showAnswerModal = () => (dispatch) => {
  dispatch({ type: SHOW_ANSWER_MODAL });
};

export const hideMenuDrawer = () => (dispatch) => {
  dispatch({ type: HIDE_MENU_DRAWER });
};

export const showMenuDrawer = () => (dispatch) => {
  dispatch({ type: SHOW_MENU_DRAWER });
};

export const hideQuestionModal = () => (dispatch) => {
  dispatch({ type: HIDE_QUESTION_MODAL });
};

export const showQuestionModal = () => (dispatch) => {
  dispatch({ type: SHOW_QUESTION_MODAL });
};
