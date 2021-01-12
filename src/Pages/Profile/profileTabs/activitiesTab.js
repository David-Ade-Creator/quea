import React from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles'

import Styles from "./styles";

const ActivitiesTabViewWithoutStyles = () => {
    return (
        <div>
           ActivitiesTab 
        </div>
    )
}

export const ActivitiesTabView = withStyles(Styles)(ActivitiesTabViewWithoutStyles);

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

const connector = connect(mapState, mapDispatch);

export const ActivitiesTab = connector(ActivitiesTabView);