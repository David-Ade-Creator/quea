import React from "react";
import { connect } from "react-redux";

import Styles from "./styles";
import { withStyles } from "@material-ui/core";

import AnswersListCard from "../../../Components/Cards/AnswerListCard";
import { Pagewithheader } from "../../../Components/Layout/PageWithHeader/pagewithheader";
import { Answer } from "../../../store";

const HomePageViewWithoutStyles = ({
  classes,
  answers,
  isAnswersInitialized,
  initializeAnswerState,
  userInfo,
  answerLike,
  newAnswerState
}) => {
  React.useEffect(() => {
    initializeAnswerState();
    newAnswerState()
  }, [initializeAnswerState, newAnswerState]);

  return (
    <Pagewithheader isLoading={!isAnswersInitialized}>
      <div className={classes.container}>
        <div className={classes.answercontainer}>
          <AnswersListCard answers={answers} user={userInfo.data.user} answerLike={answerLike}/>
        </div>
      </div>
    </Pagewithheader>
  );
};

export const HomePageView = withStyles(Styles)(HomePageViewWithoutStyles);

const mapState = (state) => ({
  answers: state.answer.answers,
  isAnswersInitialized: state.answer.answersIsinitialized,
  userInfo: state.authenticate.userInfo,
});

const mapDispatch = (dispatch) => ({
  initializeAnswerState:() => dispatch(Answer.Actions.listAnswers()),
  newAnswerState:() => dispatch(Answer.Actions.answers()),
  answerLike: (data) =>
    dispatch(Answer.Actions.answerLike(data)),
});

const connector = connect(mapState, mapDispatch);

export const HomePage = connector(HomePageView);
