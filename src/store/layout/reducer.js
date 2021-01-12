import {
  HIDE_ANSWER_MODAL,
  HIDE_MENU_DRAWER,
  HIDE_QUESTION_MODAL,
  SHOW_ANSWER_MODAL,
  SHOW_MENU_DRAWER,
  SHOW_QUESTION_MODAL,
} from "./actionType";

const initialState = {
  isAnswerModalVisible: false,
  isQuestionModalVisible: false,
  isMenuDrawerVisible: false,
};

export const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ANSWER_MODAL:
      return {
        ...state,
        isAnswerModalVisible: true,
      };
    case HIDE_ANSWER_MODAL:
      return {
        ...state,
        isAnswerModalVisible: false,
      };
    case SHOW_MENU_DRAWER:
      return {
        ...state,
        isMenuDrawerVisible: true,
      };
    case HIDE_MENU_DRAWER:
      return {
        ...state,
        isMenuDrawerVisible: false,
      };
    case SHOW_QUESTION_MODAL:
      return {
        ...state,
        isQuestionModalVisible: true,
      };
    case HIDE_QUESTION_MODAL:
      return {
        ...state,
        isQuestionModalVisible: false,
      };
    default:
      return state;
  }
};
