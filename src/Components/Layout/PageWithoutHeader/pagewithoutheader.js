import React from "react";
import { Helmet } from "react-helmet";
import AntdLayout from "antd/lib/layout";
import { PageHeader } from "antd";

export default function Pagewithoutheader({ children }) {
  return (
    <>
      <Helmet
        titleTemplate="Quea"
        defaultTitle="Quea"
        // eslint-disable-next-line no-undef
        title="Que&a"
        // eslint-disable-next-line no-undef
        //meta="the page"
      />
      <AntdLayout.Content
        style={{display:'flex',justifyContent:'center',alignItems:'center' }}
      >
    <PageHeader >
           {children}
           </PageHeader>
      </AntdLayout.Content>
    </>
  );
}