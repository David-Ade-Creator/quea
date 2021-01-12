import React from "react";
import { connect } from "react-redux";
import "./answer.css";

import Styles from "./styles";
import { withStyles } from "@material-ui/styles";

import { Button, Divider } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import AnswersListCard from "../../../Components/Cards/AnswerCard";
import { Pagewithheader } from "../../../Components/Layout/PageWithHeader/pagewithheader";
import Meta from "antd/lib/card/Meta";
import Moment from "react-moment";
import { Answer, Question } from "../../../store";
import AnswerEditor from "../../../Components/Editors/answerEditor/answerEditor";
import Form from "antd/lib/form/Form";
import { CaretLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AnswerViewWithoutStyles = ({
  classes,
  match,
  initializeQuestionDetail,
  question,
  answers,
  isInitialized,
  initializeQuestionState,
  initializeAnswerListState,
  userInfo,
  answerQuestion,
}) => {
  const questionId = match.params.id;
  const writer = userInfo.data.user._id;
  const [editorToggle, setEditorToggle] = React.useState(false);
  const [answer, setAnswer] = React.useState("");
  const [files, setFiles] = React.useState([]);

  const onEditorChange = (value) => {
    setAnswer(value);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const toggleEditor = () => {
    setEditorToggle(!editorToggle);
  };

  React.useEffect(() => {
    const questionId = match.params.id;
    initializeQuestionDetail(questionId);
    initializeAnswerListState(questionId);
  }, [
    initializeAnswerListState,
    initializeQuestionDetail,
    initializeQuestionState,
    match.params.id,
  ]);

  const submitAnswer = (e) => {
    e.preventDefault();
    toggleEditor();
    answerQuestion({ writer, questionId, answer });
  };
  return (
    <Pagewithheader
      onBack={() => window.history.back()}
      isLoading={!isInitialized}
    >
      <div className={classes.container}>
        <div className={classes.backbtn}>
          <Button onClick={() => window.history.back()}>
            <CaretLeftOutlined />
          </Button>
        </div>
        <Divider />
        <div>
          <Meta
            avatar={
              <Avatar><Link to={`/profile/${question?.whoasked?._id}`}>{question?.whoasked?.firstname.substring(0, 1)}</Link></Avatar>
            }
            title={question?.whoasked?.firstname}
            description={<Moment fromNow>{question?.createdAt}</Moment>}
          />
          <h2>{question?.question}</h2>
          <h4>
            {answers.length > 0 ? `${answers.length} answers` : "No answer yet"}
          </h4>
        </div>
        <Divider />
        <div className={classes.answerProfile}>
          <Avatar>
            {userInfo.data.user.firstname.substring(0, 1).toUpperCase()}
          </Avatar>
          <h3>
            {userInfo.data.user.firstname.toUpperCase()}, can you answer this
            question?
          </h3>
          <p>People are searching for answer to this question</p>
          <Button type="primary" onClick={toggleEditor} disabled={editorToggle}>
            Answer
          </Button>
        </div>
        {editorToggle && (
          <div className="editorCard">
            <AnswerEditor
              placeholder={"Enter your answer.."}
              onEditorChange={onEditorChange}
              onFilesChange={onFilesChange}
            />
            <Form className={classes.form}>
              <div>
                <Button
                  type="primary"
                  className={classes.formbtn}
                  onClick={submitAnswer}
                >
                  Submit
                </Button>
                <Button
                  type="ghost"
                  onClick={toggleEditor}
                  className={classes.formbtn}
                >
                  cancel
                </Button>
              </div>
            </Form>
          </div>
        )}

        <div className={classes.answercontainer}>
          <AnswersListCard answers={answers} />
        </div>
      </div>
    </Pagewithheader>
  );
};

export const AnswerPageView = withStyles(Styles)(AnswerViewWithoutStyles);

const mapState = (state) => ({
  question: state.question.question,
  isInitialized: state.question.questionDetailIsinitialized,
  answers: state.answer.questionAnswers,
  userInfo: state.authenticate.userInfo,
});

const mapDispatch = (dispatch) => ({
  initializeQuestionState: (force) =>
    dispatch(Question.Actions.listquestion(force)),
  initializeQuestionDetail: (questionId) =>
    dispatch(Question.Actions.questionDetails(questionId)),
  initializeAnswerListState: (questionId) =>
    dispatch(Answer.Actions.questionAnswers(questionId)),
  answerQuestion: (questionAnswer) =>
    dispatch(Answer.Actions.saveAnswer(questionAnswer)),
});

const connector = connect(mapState, mapDispatch);

export const AnswerPage = connector(AnswerPageView);