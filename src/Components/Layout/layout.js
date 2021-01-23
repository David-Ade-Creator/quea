import React from "react";
import AntdLayout from "antd/lib/layout";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import Styles from "./styles";

const LayoutViewWithoutStyles = ({
  children,
  classes,
  isLayoutDisabled,
}) => {
  if (isLayoutDisabled) return <>{children}</>;

  return (
    <AntdLayout className={classes.container} style={{ minHeight: "100vh" }}>
      <AntdLayout>
        <AntdLayout>{children}</AntdLayout>
      </AntdLayout>
      <AntdLayout.Footer style={{ textAlign: "center", height:"7vh" }}>
        By @ David Adeyemi
      </AntdLayout.Footer>
    </AntdLayout>
  );
};

export const LayoutView = withStyles(Styles)(LayoutViewWithoutStyles);

const mapState = (state) => ({
  isLayoutDisabled: state.layout.isLayoutDisabled,
});

const connector = connect(mapState);

export const PageLayout = connector(LayoutView);
