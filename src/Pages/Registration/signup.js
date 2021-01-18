import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Pagewithoutheader from "../../Components/Layout/PageWithoutHeader/pagewithoutheader";

import Styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Button, Input, Form, Col, Row, Alert } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Authentication } from "../../store";

const SignupViewWithoutStyles = ({
  classes,
  signUp,
  signupError,
  isSignUpSuccessful,
  isSignUpLoaded,
  isSignupApiCalled
}) => {
  const history = useHistory()
  const [initialFormValues, setInitialFormValues] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 
  useEffect(() => {
    if (!signupError && isSignUpSuccessful) {
       history.push("/signin");
      setInitialFormValues(initialFormValues);
    }
  }, [history, initialFormValues, isSignUpSuccessful, signupError]);

  const onFinish = (values) => {
    signUp(values);
  };

  return (
    <Pagewithoutheader>
      <Row justify="center" style={{ width: "90vw" }}>
        <Col
          lg={8}
          md={14}
          sm={14}
          xs={24}
          justify="center"
          className={classes.formcontainer}
        >
          <h3 style={{ textAlign: "center" }}>Create an account</h3>
          <Form initialValues={initialFormValues} onFinish={onFinish} >
            {signupError && <Alert message={signupError} type="error" />}
            <br />
            <Form.Item
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Please input your Firstname!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Firstname"
                className={classes.singleinput}
              />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please input your Lastname!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Lastname"
                className={classes.singleinput}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email Address",
                },
              ]}
            >
              <Input
                type="email"
                prefix={<MailOutlined />}
                placeholder="Email"
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
                placeholder="Password"
                className={classes.singleinput}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password again!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
                className={classes.singleinput}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={classes.submitButton}
                loading={!isSignUpLoaded && isSignupApiCalled}
              >
               {!isSignUpLoaded && isSignupApiCalled ?  "Signing up" : "Sign up" }
              </Button>
              <br />
              Already have an account? <Link to="/signin">Signin</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Pagewithoutheader>
  );
};

export const SignupPageView = withStyles(Styles)(SignupViewWithoutStyles);

const mapState = (state) => ({
  signupError: state.authenticate.signupError,
  isSignUpSuccessful: state.authenticate.isSignUpSuccessful,
  isSignUpLoaded: state.authenticate.isSignUpLoaded,
  isSignupApiCalled: state.authenticate.isSignupApiCalled,
});

const mapDispatch = (dispatch) => ({
  signUp: (value) => dispatch(Authentication.Actions.signup(value)),
});

const connector = connect(mapState, mapDispatch);

export const SignupPage = connector(SignupPageView);
