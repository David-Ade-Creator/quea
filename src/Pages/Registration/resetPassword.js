import React from "react";
import { connect } from "react-redux";
import Pagewithoutheader from "../../Components/Layout/PageWithoutHeader/pagewithoutheader";

import Styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Button, Input, Form, Col, Row, Alert } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { Authentication } from "../../store";

const ResetPasswordViewWithoutStyles = ({
  classes,
  resetPassword,
  resetPasswordLoaded,
  resetPasswordApiCalled,
  resetPasswordError,
  resetPasswordSuccess,
  isAuthenticated,
  match
}) => {
  const history = useHistory();

  React.useEffect(()=> {
    if (resetPasswordSuccess) history.push("/signin");
  },[history, resetPasswordSuccess]);

  
  const onFinish = (values) => {
    resetPassword(values);
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
          <h3 style={{ textAlign: "center" }}>Send password reset link</h3>
          <Form 
          initialValues={{
            resetPasswordLink: `${match.params.token}`,
          }}
           onFinish={onFinish}>
          {resetPasswordError && <Alert message={resetPasswordError} type="error" />}
          <br/>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your New Password!",
                },
              ]}
            >
              <Input
                type="password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="New Password"
                className={classes.singleinput}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please Confirm Your New Password",
                },
              ]}
            >
              <Input
                type="password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Confirm Password"
                className={classes.singleinput}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={classes.submitButton}
                loading={!resetPasswordLoaded && resetPasswordApiCalled}
              >
                {!resetPasswordLoaded && resetPasswordApiCalled ? "Resetting password":"Reset Password"}
              </Button>
              <br />
              <br />
              <Link to="/signin">Signin to your account</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Pagewithoutheader>
  );
};

export const ResetPasswordPageView = withStyles(Styles)(
  ResetPasswordViewWithoutStyles
);

const mapState = (state) => ({
  isAuthenticated: state.authenticate.isAuthenticated,
  resetPasswordError: state.authenticate.resetPasswordError,
  resetPasswordLoaded: state.authenticate.resetPasswordLoaded,
  resetPasswordApiCalled: state.authenticate.resetPasswordApiCalled,
  resetPasswordSuccess: state.authenticate.resetPasswordSuccess,
});

const mapDispatch = (dispatch) => ({
  resetPassword: (values) =>
    dispatch(Authentication.Actions.resetPassword(values)),
});

const connector = connect(mapState, mapDispatch);

export const ResetPasswordPage = connector(ResetPasswordPageView);
