import React, { useEffect } from "react";
import { connect } from "react-redux";
import Pagewithoutheader from "../../Components/Layout/PageWithoutHeader/pagewithoutheader";

import Styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Button, Form, Col, Row, Alert } from "antd";
import { Authentication } from "../../store";
import { useHistory } from "react-router-dom";

const ActivateAccountViewWithoutStyles = ({
  classes,
  match,
  activateAccount,
  isActivateLoaded,
  isActivateApiCalled,
  isActivateApiSuccess,
  activationError,
  isAuthenticated,
  isActivateUser
}) => {

  const history = useHistory()

  const onFinish = (values) => {
    activateAccount(match.params.token);
  };

  useEffect(() => {
    activateAccount(match.params.token);
    if (isActivateUser) history.push("/signin")
  }, [activateAccount, history, isActivateUser, match.params.token]);

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
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            {activationError && <Alert message={activationError} type="error" />}
            <br/>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={classes.submitButton}
                loading={!isActivateLoaded && isActivateApiCalled}
              >
               {!isActivateLoaded && isActivateApiCalled ? "Activating Account" : "Activate Account"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Pagewithoutheader>
  );
};

export const ActivateAccountPageView = withStyles(Styles)(
  ActivateAccountViewWithoutStyles
);

const mapState = (state) => ({
  isAuthenticated: state.authenticate.isAuthenticated,
  activationError: state.authenticate.activationError,
  isActivateLoaded: state.authenticate.isActivateLoaded,
  isActivateApiCalled: state.authenticate.isActivateApiCalled,
  isActivateApiSuccess: state.authenticate.isActivateApiSuccess,
  isActivateUser: state.authenticate.isActivateUser,
});

const mapDispatch = (dispatch) => ({
  activateAccount: (token) => dispatch(Authentication.Actions.activate(token)),
});

const connector = connect(mapState, mapDispatch);

export const ActivateAccountPage = connector(ActivateAccountPageView);
