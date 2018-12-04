import * as React from 'react'

import Paper from '@material-ui/core/Paper';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

import {map} from 'lodash'

import Header from './header'
import Footer from './footer'

const styles = ({palette}: Theme) => createStyles({
    page: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        backgroundColor: palette.primary.light
    },

    header: {
        flex: 1,
        marginBottom: "2em",
    },

    footer: {
        marginTop: "5em",
    },

    contentClass: {
        flex: 1,
        marginLeft: "10%",
        marginRight: "10%",
    },

    '@media (max-width: 800px)': {
        contentClass: {
            marginLeft: "0%",
            marginRight: "0%",
        },
    },

    '@media (min-width: 1400px)': {
        contentClass: {
            marginLeft: "15%",
            marginRight: "15%",
        },
    },

    contentItem: {
        marginBottom: "0.5em",
        marginTop: "0.5em",
        padding: "0.5em 1em 1em 1em",
    }
});

interface IPageProps {
    classes: any;
    children: any[];
}

class Page extends React.Component<IPageProps> {
    render() {
        return (
            <>
                <div className={this.props.classes.page}>
                    <Header className={this.props.classes.header}/>
                    {/* TODO: banner image layer */}

                    <div className={this.props.classes.contentClass}>
                        {
                            map(this.props.children, (child) => {
                                return (
                                    <Paper className={this.props.classes.contentItem}>
                                        {child}
                                    </Paper>
                                )
                            })
                        }
                    </div>

                    <Footer className={this.props.classes.footer}/>
                </div>
            </>
        )
    }
}

export default withStyles(styles)(Page);
