import React from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles'

import Styles from "./styles";
import QuestionListCard from '../../../Components/Cards/QuestionListCard';

const QuestionTabViewWithoutStyles = () => {
    return (
        <div>
           <QuestionListCard/>
        </div>
    )
}

export const QuestionTabView = withStyles(Styles)(QuestionTabViewWithoutStyles);

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

const connector = connect(mapState, mapDispatch);

export const QuestionTab = connector(QuestionTabView);