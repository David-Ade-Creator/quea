import React from 'react';
import { Button, Drawer } from 'antd';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export default function Sidebar({visible,toggleSideNav,userInfo,logout}){

    return (
      <Drawer
      title="Quea Platform"
      placement="left"
      closable={false}
      onClose={toggleSideNav}
      visible={visible}
      key="left"
      >
      <h3><Link to="/">Home</Link></h3>
      <h3><Link to="/questions">Questions</Link></h3>
      <h3><Link to={`/profile/${userInfo.data.user._id}`}>Profile</Link></h3>
      {/* <Button type="primary" onClick={logout()}>Logout</Button> */}
    </Drawer>
    )
}
