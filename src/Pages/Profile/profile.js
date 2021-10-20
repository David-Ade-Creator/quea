import React from "react";
import { connect } from "react-redux";
import Styles from "./styles";
import { withStyles } from "@material-ui/core";
import { Button, Col, Divider, Row } from "antd";
import { CaretLeftOutlined, EditFilled } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { Pagewithheader } from "../../Components/Layout/PageWithHeader/pagewithheader";
import { User } from "../../store";
import { Link } from "react-router-dom";

const ProfileViewWithoutStyles = ({
  classes,
  initializeUserProfileState,
  match,
  isUserProfileInitialized,
  userProfile,
  isUserInitialized,
  authUser,
}) => {
  const userId = match.params.id;
  React.useEffect(() => {
    initializeUserProfileState(userId);
  }, [initializeUserProfileState, userId]);

  return (
    <Pagewithheader isLoading={!isUserProfileInitialized && !isUserInitialized}>
      <div className={classes.backbtn}>
        <Button onClick={() => window.history.back()}>
          <CaretLeftOutlined />
        </Button>
      </div>
      <Divider />
      <div className={classes.container}>
        <Row justify="center">
          <Col lg={12} md={24} sm={24} xs={24} className={classes.photodiv}>
            <Avatar
              shape="square"
              size={102}
              src={`${userProfile?.info?.photo}`}
              alt={`${userProfile?.firstname.substring(0, 1).toUpperCase()}`}
            ></Avatar>
            <span>
              <h3>{userProfile?.firstname + " " + userProfile?.lastname} </h3>
            </span>
            <span>
              <h3>{userProfile?.email}</h3>
            </span>
          </Col>
          <Col lg={12} md={24} sm={24} xs={24} className={classes.editdiv}>
            <Row>
              {authUser?.data?.user._id === userId && (
                <Link to={`/editprofile/${userProfile?._id}`}>
                  <Button type="ghost" className={classes.editbtn}>
                    <EditFilled />
                  </Button>
                </Link>
              )}
            </Row>
            <h3>Education:</h3>
            <p>
              {userProfile?.info?.education
                ? `${userProfile?.info?.education}`
                : "Update your education credentials"}
            </p>
            <h3>Country:</h3>
            <p>
              {userProfile?.info?.country
                ? `${userProfile?.info?.country}`
                : "update your country"}
            </p>
            <h3>State:</h3>
            <p>
              {userProfile?.info?.state
                ? `${userProfile?.info?.state}`
                : "update your state"}
            </p>
            <h3>Address:</h3>
            <p>
              {userProfile?.info?.address
                ? `${userProfile?.info?.address}`
                : "update your address"}
            </p>
            <h3>Description:</h3>
            <p>
              {userProfile?.info?.description
                ? `${userProfile?.info?.description}`
                : "add a personal description"}
            </p>
          </Col>
        </Row>
      </div>
    </Pagewithheader>
  );
};

export const ProfilePageView = withStyles(Styles)(ProfileViewWithoutStyles);

const mapState = (state) => ({
  isUserInitialized: state.user.isInitialized,
  isUserProfileInitialized: state.user.isUserProfileInitialized,
  userProfile: state.user.userProfile,
  authUser: state.authenticate.userInfo,
});

const mapDispatch = (dispatch) => ({
  initializeUserProfileState: (userId) =>
    dispatch(User.Actions.userProfileInfo(userId)),
});

const connector = connect(mapState, mapDispatch);

export const ProfilePage = connector(ProfilePageView);
