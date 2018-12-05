import * as React from 'react';

import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import Page from '../page/page';
import Paper from '@material-ui/core/Paper';

const styles = ({}: Theme) => createStyles({
    header: {
        textAlign: "center",
    },

    contentbody: {
        padding: "0.5em 1em 1em 1em",
        // All items are big, mostly for demo purposes
        minHeight: "40vh",
    },

    // Must always be at least 40vh high
    firstItem: {
        minHeight: "40vh",
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
                            <h1> Welkom </h1>
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
                        <h1> Ik wil ruilen! </h1>
                    </div>
                    <Paper className={classes.contentbody}>
                        erg leuk, vul even je eigen gegevens in en je voorkeuren voor een kamer.


                    </Paper>
                </>
            </Page>
        );
    }
};

export default withStyles(styles)(IndexPage);
