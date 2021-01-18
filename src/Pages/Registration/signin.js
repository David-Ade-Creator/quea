import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Pagewithoutheader from "../../Components/Layout/PageWithoutHeader/pagewithoutheader";

import Styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Button, Input, Form, Col, Row, Checkbox, Alert } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Authentication } from "../../store";

const SigninViewWithoutStyles = ({
  classes,
  signin,
  signinError,
  isSigninSuccessful,
  isSigninLoaded,
  isSigninApiCalled,
}) => {
  const history = useHistory();
  const [initialFormValues, setInitialFormValues] = React.useState({
    email: "",
    password: "",
    remember: false,
  });

  React.useEffect(() => {
    if (isSigninSuccessful){
      history.push("/")
      setInitialFormValues(initialFormValues)
    }
  }, [history, initialFormValues, isSigninSuccessful, signinError]);

  const onFinish = (values) => {
    signin(values);
  };

  return (
    <Pagewithoutheader>
      <Row justify="center" className={classes.rowContainer}>
        <Col
          lg={8}
          md={24}
          sm={24}
          xs={24}
          justify="center"
          className={classes.formcontainer}
        >
          <h3 style={{ textAlign: "center" }}>Signin</h3>
          <Form initialValues={initialFormValues} onFinish={onFinish}>
          {signinError && <Alert message={signinError} type="error" />}
          <br/>
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
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Enter Your Password"
                className={classes.singleinput}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/resetlink">Forgot password</Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={classes.submitButton}
                loading={!isSigninLoaded && isSigninApiCalled}
              >
               {!isSigninLoaded && isSigninApiCalled ? "Login in" : "Log in"}
              </Button>
              Or <Link to="/signup">register now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Pagewithoutheader>
  );
};

export const SigninPageView = withStyles(Styles)(SigninViewWithoutStyles);

const mapState = (state) => ({
  signinError: state.authenticate.signinError,
  isSigninSuccessful: state.authenticate.isSigninSuccessful,
  isSigninLoaded: state.authenticate.isSigninLoaded,
  isSigninApiCalled: state.authenticate.isSigninApiCalled,
});

const mapDispatch = (dispatch) => ({
  signin: (value) => dispatch(Authentication.Actions.signin(value)),
});

const connector = connect(mapState, mapDispatch);

export const SigninPage = connector(SigninPageView);
