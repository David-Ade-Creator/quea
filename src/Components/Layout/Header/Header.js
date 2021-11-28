import React from "react";
import {
  EditOutlined,
  HomeOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { withStyles } from "@material-ui/core";
import { Button } from "antd";
import { connect } from "react-redux";
import Styles from "./styles";
import { Link } from "react-router-dom";
import { Layout } from "../../../store";
import AntdLayout from "antd/lib/layout";

const NavHeaderWithoutStyles = ({
  toggleSideNav,
  classes,
  toggleAnswerModal,
  userInfo,
  logout,
}) => {
  return (
    <AntdLayout.Header className={classes.headercontainer} >
      <div className={classes.header}>
        <div><h3 className={classes.logo}>Quea</h3></div>
        <div className={classes.navbar}>
          <ul className={classes.navlist}>
            <li className={classes.navitems}><Link to="/questions"  style={{color:"white"}}>Questions</Link></li>
            <li className={classes.navitems}><Link to="/" style={{color:"white"}}>Home</Link></li>
            <li className={classes.navitems}><Link to={`/profile/${userInfo.data.user._id}`} style={{color:"white"}}>Profile</Link></li>
          </ul>
          <ul className={classes.navlist2}>
            <li className={classes.navitems}><Link to="/questions" style={{color:"white"}}><EditOutlined /></Link></li>
            <li className={classes.navitems}><Link to="/" style={{color:"white"}}><HomeOutlined /></Link></li>
          </ul>
          <span>
          <Button
              type="primary"
              key="ask"
              onClick={toggleAnswerModal}
              className={classes.menubuttons}
            >
              ASK
            </Button>
            <Button
              type="primary"
              key="drawer"
              onClick={toggleSideNav}
              className={classes.drawerbutton}
            >
              <MenuFoldOutlined />
            </Button>
          </span>
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
