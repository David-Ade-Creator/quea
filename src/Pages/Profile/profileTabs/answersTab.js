import React from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles'

import Styles from "./styles";
import AnswersListCard from '../../../Components/Cards/AnswerCard';

const AnswersTabViewWithoutStyles = () => {
    return (
        <div>
           <AnswersListCard/> 
        </div>
    )
}

export const AnswersTabView = withStyles(Styles)(AnswersTabViewWithoutStyles);

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

const connector = connect(mapState, mapDispatch);

export const AnswersTab = connector(AnswersTabView);