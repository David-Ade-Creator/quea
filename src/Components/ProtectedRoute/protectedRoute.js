import React from "react";
//import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import withStyles from "@material-ui/styles/withStyles";
import Styles from "./styles";
import { routerActions } from "connected-react-router";


export const ProtectedRouteViewWithoutStyles = ({
    props,
    Component,
    isAuthenticated,
    classes,
    goToLogin,
    ...restProps
}) => { 

    React.useEffect(() => {
        if (!isAuthenticated) goToLogin();
    }, [goToLogin, isAuthenticated, restProps]);

    if (isAuthenticated) {
        return <Component {...restProps} />;
    }

    return null;
};

export const ProtectedRouteView = withStyles(Styles)(ProtectedRouteViewWithoutStyles);

const mapState = (state) => ({
    isAuthenticated: state.authenticate.isAuthenticated,
});

const mapDispatch = (dispatch) => ({
    goToLogin: () => dispatch(routerActions.replace("/signin")),
});

const connector = connect(mapState, mapDispatch);

export const ProtectedRoute = connector(ProtectedRouteView);