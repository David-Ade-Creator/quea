import React, { useState } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import AntdLayout from "antd/lib/layout";
import { BackTop, Col, PageHeader, Row } from "antd";
import SkeletonCard from "../../Cards/SkeletonCard";
import { withStyles } from "@material-ui/styles";
import Styles from "./styles";
import { NavHeader } from "../Header/Header";
import Sidebar from "../../Sidebar/sidebar";
import { AnswerModal } from "../../Modals/answerModal";
import { CaretUpOutlined } from "@ant-design/icons";

export const PagewithheaderViewWithoutStyles = ({
  children,
  isLoading,
  pageTitle,
  pageHeaderExtra,
  showModalState,
  isAnswerSaved,
  isSaveAnswerInitialized,
  onBack,
  logout,
  userInfo
}) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isAnswerModalVisible, setAnswerModalVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleAnswerModal = () => {
    setAnswerModalVisible(!isAnswerModalVisible);
  };

  React.useEffect(() => {
    if(isAnswerSaved) setAnswerModalVisible(false);
  }, [isAnswerSaved])

  return (
    <>
    <BackTop>
      <div><CaretUpOutlined style={{ color: '#48a1fa', fontSize: '22px' }} /></div>
    </BackTop>
      <NavHeader toggleSideNav={toggleSidebar} toggleAnswerModal={toggleAnswerModal} userInfo={userInfo} logout={logout} />
      <Sidebar toggleSideNav={toggleSidebar} visible={isSidebarVisible} userInfo={userInfo} logout={logout}/>
      <Helmet
        titleTemplate="Quea"
        defaultTitle="Quea"
        title="Que&a"
        // eslint-disable-next-line no-undef
        //meta="the page"
      />
      <AnswerModal toggleAnswerModal={toggleAnswerModal} isAnswerModalVisible={isAnswerModalVisible} isSaveAnswerInitialized={isSaveAnswerInitialized}/>
      <AntdLayout.Content style={{ marginTop: "12vh" }}>
        <Row justify="center">
          <Col
            lg={13}
            md={24}
            sm={24}
            xs={24}
            justify="center"
            style={{ backgroundColor: "white" }}
          >
            <PageHeader
              title={pageTitle}
              style={{ padding: "10px" }}
              extra={pageHeaderExtra}
              onBack={onBack}
            >
              {isLoading ? <SkeletonCard /> : children}
            </PageHeader>
          </Col>
        </Row>
      </AntdLayout.Content>
    </>
  );
};

export const PagewithheaderView = withStyles(Styles)(
  PagewithheaderViewWithoutStyles
);

const mapState = (state) => ({
  showModalState: state.layout.isAnswerModalVisible,
  isAnswerSaved: state.answer.isAnswerSaved,
  isSaveAnswerInitialized : state.answer.isSaveAnswerInitialized,
  userInfo : state.authenticate.userInfo,
  logout: state.authenticate.logout
});

const connector = connect(mapState, null);

export const Pagewithheader = connector(PagewithheaderView);
