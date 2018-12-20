import * as React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';


const styles = ({ }: Theme) => createStyles({
    root: {
        position: 'sticky',
        width: '100%',
        zIndex: 1100,
        top: '0px',
        right: '0px',
        flexGrow: 1,
    },

    appBar: {
        paddingTop: "0.5em",
        paddingBottom: "0.5em",
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
    },

    navButtons: {
        "& > *": {
            marginRight: "5px"
        }
    }
});

interface IHeaderProps {
    classes: any;
}

class Header extends React.Component<IHeaderProps & React.HTMLAttributes<HTMLDivElement>> {
    render() {
        let { classes } = this.props
        return (
            <div className={`${classes.root} ${this.props.className}`}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h4" color="inherit" className={classes.title}>
                            Swap My Room
                        </Typography>
                        <div className={classes.navButtons}>
                            {this.renderNavButtons()}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    renderNavButtons() {
        return (
            <>
                <Button
                    href={"#about"}
                    variant={"contained"}>
                    {'About us`'}
                </Button>
                <Button
                    variant={"contained"}>
                    {'Our mission`'}
                </Button>
            </>
        )
    }
}

export default withStyles(styles)(Header);
