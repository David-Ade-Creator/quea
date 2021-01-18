import React from "react";
//import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import withStyles from "@material-ui/styles/withStyles";
import Styles from "./styles";
import { routerActions } from "connected-react-router";
import { useHistory } from "react-router-dom";


export const ProtectedRouteViewWithoutStyles = ({
    props,
    Component,
    isAuthenticated,
    classes,
    goToLogin,
    isSigninSuccessful,
    ...restProps
}) => { 
    const history = useHistory()

    React.useEffect(() => {
        if (!isAuthenticated) history.push("/signin");
    }, [goToLogin, history, isAuthenticated, restProps]);

    if (isAuthenticated) {
        return <Component {...restProps} />;
    }

    return <>loading</>;
};

export const ProtectedRouteView = withStyles(Styles)(ProtectedRouteViewWithoutStyles);

const mapState = (state) => ({
    isAuthenticated: state.authenticate.isAuthenticated,
    isSigninSuccessful: state.authenticate.isSigninSuccessful
});

const mapDispatch = (dispatch) => ({
    goToLogin: () => dispatch(routerActions.replace("/signin")),
});

const connector = connect(mapState, mapDispatch);

export const ProtectedRoute = connector(ProtectedRouteView);