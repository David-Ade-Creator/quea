import React from "react";
import {
  EditOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { withStyles } from "@material-ui/core";
import { Button, Menu } from "antd";
import AntdLayout from "antd/lib/layout";
import { connect } from "react-redux";
import Styles from "./styles";
import { Link } from "react-router-dom";
import { Layout } from "../../../store";

const NavHeaderWithoutStyles = ({
  toggleSideNav,
  classes,
  toggleAnswerModal,
  userInfo,
  logout,
}) => {
  return (
    <AntdLayout.Header className={classes.headercontainer}>
      <div className={classes.header}>
        <div className={classes.logo}>Quea</div>
        <div className={classes.navlist}>
          <Menu
            theme="dark"
            mode="horizontal"
            className={classes.menuitems}
            defaultSelectedKeys={[""]}
          >
            <Menu.Item key="/questions">
              <Link to="/questions">Questions</Link>
            </Menu.Item>
            <Menu.Item key="/">
              <Link to="/">Home</Link>
            </Menu.Item>
            {/* <Menu.Item key="/a">
              <Link to="/">Steams</Link>
            </Menu.Item> */}
            <Menu.Item key="/profile">
              <Link to={`/profile/${userInfo.data.user._id}`}>Profile</Link>
            </Menu.Item>
          </Menu>
          <div>
            <Button
              type="primary"
              key="edit"
              onClick={console.log("/questions")}
              className={classes.drawerbutton}
            >
              <Link to="/questions"><EditOutlined /></Link>
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              key="home"
              className={classes.drawerbutton}
            >
              <Link to="/"><HomeOutlined /></Link>
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              key="profile"
              className={classes.drawerbutton}
            >
              <Link to={`/profile/${userInfo.data.user._id}`}><UserOutlined /></Link>
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              key="ask"
              onClick={toggleAnswerModal}
              className={classes.menubuttons}
            >
              ASK
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              key="drawer"
              onClick={toggleSideNav}
              className={classes.drawerbutton}
            >
              <MenuFoldOutlined />
            </Button>
          </div>
        </div>
      </div>
    </AntdLayout.Header>
  );
};

export const NavHeaderView = withStyles(Styles)(NavHeaderWithoutStyles);

const mapDispatch = (dispatch) => ({
  showAnswerModal: () => dispatch(Layout.Actions.showAnswerModal()),
});

const connector = connect(null, mapDispatch);

export const NavHeader = connector(NavHeaderView);
