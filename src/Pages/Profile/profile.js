import React from "react";

import { connect } from "react-redux";
import Styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Button, Col, Divider, Row, Tabs } from "antd";
import {
  CaretLeftOutlined,
  EditFilled,
  EditOutlined,
  QuestionCircleOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { Pagewithheader } from "../../Components/Layout/PageWithHeader/pagewithheader";
import { ActivitiesTab } from "./profileTabs/activitiesTab";
import { QuestionTab } from "./profileTabs/questionTab";
import { AnswersTab } from "./profileTabs/answersTab";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { User } from "../../store";

const { TabPane } = Tabs;

const ProfileViewWithoutStyles = ({
  classes,
  initializeUserProfileState,
  match,
  isUserProfileInitialized,
  userProfile,
}) => {

  React.useEffect(() => {
    const userId = match.params.id;
    initializeUserProfileState(userId);
  }, [initializeUserProfileState, match.params.id]);
  return (
    <Pagewithheader isLoading={!isUserProfileInitialized}>
       <div className={classes.backbtn}>
        <Button onClick={() => window.history.back()}>
          <CaretLeftOutlined />
        </Button>
      </div>
      <Divider />
      <div className={classes.container}>
        <Row justify="center">
          <Col
            lg={12}
            md={24}
            sm={24}
            xs={24}
            style={{ minHeight: "250px", textAlign: "center", marginTop: "8%" }}
          >
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
          <Col
            lg={12}
            md={24}
            sm={24}
            xs={24}
            style={{ minHeight: "250px", padding: "25px 10px" }}
          >
            <Row>
              <Link to={`/editprofile/${userProfile?._id}`}>
                <Button type="ghost" className={classes.editbtn}>
                  <EditFilled />
                </Button>
              </Link>
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
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" centered>
          <TabPane
            tab={
              <span>
                <ScheduleOutlined />
                Activities
              </span>
            }
            key="1"
          >
            <ActivitiesTab />
          </TabPane>
          <TabPane
            tab={
              <span>
                <QuestionCircleOutlined />
                Questions
              </span>
            }
            key="2"
          >
            <QuestionTab />
          </TabPane>
          <TabPane
            tab={
              <span>
                <EditOutlined />
                Answers
              </span>
            }
            key="3"
          >
            <AnswersTab />
          </TabPane>
        </Tabs>
      </div>
    </Pagewithheader>
  );
};

export const ProfilePageView = withStyles(Styles)(ProfileViewWithoutStyles);

const mapState = (state) => ({
  isUserProfileInitialized: state.user.isUserProfileInitialized,
  userProfile: state.user.userProfile,
});

const mapDispatch = (dispatch) => ({
  initializeUserProfileState: (userId) =>
    dispatch(User.Actions.userProfileInfo(userId)),
});

const connector = connect(mapState, mapDispatch);

export const ProfilePage = connector(ProfilePageView);
