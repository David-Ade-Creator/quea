import React from "react";
import {
  MenuFoldOutlined,
} from "@ant-design/icons";
import { withStyles } from "@material-ui/styles";
import { Button, Menu } from "antd";
import AntdLayout from "antd/lib/layout";
import { connect } from "react-redux";
import Styles from "./styles";
import { Link } from "react-router-dom";
import { Layout } from "../../../store";

const NavHeaderWithoutStyles = ({toggleSideNav,classes, toggleAnswerModal, userInfo }) => {
  return (
    <AntdLayout.Header
      className={classes.container}
    >
      <div className={classes.logo}>Quea</div>
      
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[""]}>
        <Menu.Item key="/">
        <Link to="/">
          Home
          </Link>
        </Menu.Item>
        <Menu.Item key="/profile" >
        <Link to={`/profile/${userInfo.data.user._id}`}>
          Profile
          </Link>
        </Menu.Item>
      </Menu>
      <div>
      <Button type="primary" onClick={toggleAnswerModal} className={classes.menubuttons}>
            ASK
          </Button>
      </div>
      <div>
      <Button type="primary" onClick={toggleSideNav} className={classes.menubuttons}>
            <MenuFoldOutlined />
          </Button>
      </div>
    </AntdLayout.Header>
  );
}

export const NavHeaderView = withStyles(Styles)(NavHeaderWithoutStyles);

const mapDispatch = (dispatch) => ({
  showAnswerModal: () => dispatch(Layout.Actions.showAnswerModal())
});

const connector = connect(null,mapDispatch);

export const NavHeader = connector(NavHeaderView);
