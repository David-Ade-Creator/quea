import React from "react";

import io from 'socket.io-client';

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import QuestionListCard from "../../Components/Cards/QuestionListCard";
import Styles from "./styles";
import { Pagewithheader } from "../../Components/Layout/PageWithHeader/pagewithheader.js";
import { Answer, Question, User } from "../../store";
import { List } from "antd";
import { baseUrl } from "../../store/baseUrl";

const QuestionViewWithoutStyles = ({
  isInitialized,
  classes,
  initializeQuestionState,
  questions,
  initializeAnswerState,
  initalizeUsersState,
  isUsersInitialized,
  isAuthenticated,
  newQuestionState
}) => {
  const socket = io(baseUrl);
  React.useEffect(() => {
    initializeQuestionState();
    initializeAnswerState();
    initalizeUsersState();
    newQuestionState();
  }, [initalizeUsersState, initializeAnswerState, initializeQuestionState, newQuestionState, socket]);

  const loadMore = () => {
    console.log("loadmore");
  };

  return (
    <>
      <Pagewithheader
        pageTitle={isInitialized && "Questions for you"}
        isLoading={!isInitialized && !isUsersInitialized}
      >
        <List
          className="demo-loadmore-list"
          loading={!isInitialized}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={questions}
          renderItem={(item) => (
            <QuestionListCard key={item._id} question={item} />
          )}
        />
        <br />
        {/* <div className={classes.loadmore}>
          <Button type="primary">Load more</Button>
        </div> */}
      </Pagewithheader>
    </>
  );
};

export const QuestionPageView = withStyles(Styles)(QuestionViewWithoutStyles);

const mapState = (state) => ({
  isAuthenticated: state.authenticate.isAuthenticated,
  questions: state.question.questions,
  isInitialized: state.question.isInitialized,
  isUsersInitialized: state.user.isInitialized,
});

const mapDispatch = (dispatch) => ({
  initializeQuestionState: (force) =>
    dispatch(Question.Actions.listquestion(force)),
    newQuestionState: () =>
    dispatch(Question.Actions.questions()),
  initializeAnswerState: () => dispatch(Answer.Actions.listAnswers()),
  initalizeUsersState: () => dispatch(User.Actions.usersList()),
});

const connector = connect(mapState, mapDispatch);

export const QuestionPage = connector(QuestionPageView);
