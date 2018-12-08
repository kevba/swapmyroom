import * as React from 'react';

import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Page from '../page/page';
import {backGroundImgHeight} from '../page/backgroundImage'
import StepperForm from './formStepper'


const styles = ({}: Theme) => createStyles({
    header: {
        textAlign: "center",
    },

    contentbody: {
        padding: "20px",
        // All items are big, mostly for demo purposes
        minHeight: "40vh",
        textAlign: "center",
    },

    formWrapper: {
        width: "100%",
        maxWidth: "30em",
        display: "inline-block"
    },

    // Must always be at least as tall as the background image
    firstItem: {
        minHeight: backGroundImgHeight,
    },

});

interface IIndexPageProps {
    classes: any;
}

export class IndexPage extends React.Component<IIndexPageProps> {
    render() {
        let {classes} = this.props;
        return (
            <Page>
                <>
                    <Paper className={`${classes.contentbody} ${classes.firstItem}`}>
                        <div className={classes.header}>
                            <h1> Hello there </h1>
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </Paper>
                </>
                <>
                    <div className={classes.header}>
                        <h1> test 2 </h1>
                    </div>
                    <Paper className={classes.contentbody}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </Paper>
                </>
                <>
                    <div className={classes.header}>
                        <h1> I want to swap! </h1>
                    </div>
                    <Paper className={classes.contentbody}>
                        <div>
                            Great! just a few things to fill in
                        </div>
                        <div className={classes.formWrapper}>
                            <StepperForm />
                        </div>
                    </Paper>
                </>
            </Page>
        );
    }
};

export default withStyles(styles)(IndexPage);
