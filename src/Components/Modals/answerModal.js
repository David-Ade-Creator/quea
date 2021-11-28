import React from "react";
import { connect } from "react-redux";

import Styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Input, Form, Button, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import { LinkOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Question } from "../../store";

const AnswerModalWithoutStyles = ({
  toggleAnswerModal,
  isAnswerModalVisible,
  userInfo,
  submitQuestion,
}) => {
  const whoasked = userInfo?.data?.user._id;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    submitQuestion({...values,whoasked});
    toggleAnswerModal();
    form.resetFields();
  };

  return (
    <Modal
      visible={isAnswerModalVisible}
      title="Ask Quea"
      onOk={toggleAnswerModal}
      onCancel={toggleAnswerModal}
      footer={null}
    >
      <Form initialValues={{question:"",link:""}} onFinish={onFinish} form={form}>
      <Form.Item
        name="question"
        rules={[
          {
            required: true,
            message: 'A questio must be asked!',
          },
        ]}
      >
        <Input
          type="text"
          prefix={<QuestionCircleOutlined className="site-form-item-icon" />}
          placeholder="Ask Quea"
          bordered={false}
        />
      </Form.Item>

      <Form.Item
        name="link"
      >
        <Input
          type="text"
          prefix={<LinkOutlined className="site-form-item-icon" />}
          placeholder="Enter link of context (optional)"
          bordered={false}
        />
      </Form.Item>
      <Form.Item
      >
        <Space>
        <Button type="ghost" onClick={toggleAnswerModal}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        </Space>
      </Form.Item>
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
