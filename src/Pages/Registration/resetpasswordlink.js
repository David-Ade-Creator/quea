import React from "react";
import { connect } from "react-redux";
import Pagewithoutheader from "../../Components/Layout/PageWithoutHeader/pagewithoutheader";

import Styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Button, Input, Form, Col, Row, Alert } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Authentication } from "../../store";

const ResetLinkViewWithoutStyles = ({
  classes,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordError,
  forgotPasswordLoaded,
  forgotPasswordApiCalled,
}) => {
console.log(forgotPasswordSuccess);
  const onFinish = (values) => {
   forgotPassword(values);
  };

  return (
    <Pagewithoutheader>
      <Row justify="center" style={{ width: "90vw" }}>
        <Col
          lg={8}
          md={24}
          sm={24}
          xs={24}
          justify="center"
          className={classes.formcontainer}
        >
          <h3 className={classes.text}>Send password reset link</h3>
          <Form
            initialValues={{
              email: "",
            }}
            onFinish={onFinish}
          >
            {forgotPasswordError && <Alert message={forgotPasswordError} type="error" />}
            <br />
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                type="email"
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                className={classes.singleinput}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={classes.submitButton}
                disabled={forgotPasswordSuccess}
                loading={!forgotPasswordLoaded && forgotPasswordApiCalled}
              >
                {!forgotPasswordLoaded && forgotPasswordApiCalled ? "sending": "Send resetpassword link"}
              </Button>
              <br />
              <br />
              <Link to="/signin">signin to you account</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Pagewithoutheader>
  );
};

export const ResetLinkPageView = withStyles(Styles)(ResetLinkViewWithoutStyles);

const mapState = (state) => ({
  forgotPasswordSuccess: state.authenticate.forgotPasswordSuccess,
  forgotPasswordError: state.authenticate.forgotPasswordError,
  forgotPasswordLoaded: state.authenticate.forgotPasswordLoaded,
  forgotPasswordApiCalled: state.authenticate.forgotPasswordApiCalled,
});

const mapDispatch = (dispatch) => ({
  forgotPassword :(values) => dispatch(Authentication.Actions.forgotPassword(values)),
});

const connector = connect(mapState, mapDispatch);

export const ResetLinkPage = connector(ResetLinkPageView);
