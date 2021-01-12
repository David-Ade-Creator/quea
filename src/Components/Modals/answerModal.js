import React from "react";
import { connect } from "react-redux";

import Styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Button, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import Form from "antd/lib/form/Form";
import { LinkOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Question } from "../../store";

const AnswerModalWithoutStyles = ({
  toggleAnswerModal,
  isAnswerModalVisible,
  userInfo,
  submitQuestion,
}) => {
  const whoasked = userInfo.data.user._id;

  const [question, setQuestion] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {;
    return () => {
      //
    };
  }, []);

  const onFinish = () => {
    submitQuestion({question,link,whoasked});
  };

  return (
    <Modal
      visible={isAnswerModalVisible}
      title="Ask Quea"
      onOk={toggleAnswerModal}
      onCancel={toggleAnswerModal}
      footer={[
        <Button key="back" onClick={toggleAnswerModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={()=>{onFinish();toggleAnswerModal()}}>
          Submit
        </Button>,
      ]}
    >
      <Form>
        <Input
          type="text"
          name="question"
          prefix={<QuestionCircleOutlined className="site-form-item-icon" />}
          placeholder="Ask Quea"
          bordered={false}
          onChange={(e)=>setQuestion(e.target.value)}
        />
        <br />
        <Input
          type="text"
          name="link"
          prefix={<LinkOutlined className="site-form-item-icon" />}
          placeholder="Enter link of context (optional)"
          bordered={false}
          onChange={(e)=>setLink(e.target.value)}
        />
      </Form>
    </Modal>
  );
};

export const AnswerModalView = withStyles(Styles)(AnswerModalWithoutStyles);

const mapState = (state) => ({
  userInfo: state.authenticate.userInfo,
});

const mapDispatch = (dispatch) => ({
  submitQuestion : (question) => dispatch(Question.Actions.savequestion(question)),
});

const connector = connect(mapState, mapDispatch);

export const AnswerModal = connector(AnswerModalView);
