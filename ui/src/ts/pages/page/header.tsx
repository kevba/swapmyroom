import * as React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button, {ButtonProps} from '@material-ui/core/Button';

import {map} from 'lodash';

import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

const logo = '/images/logo.svg';

export interface INavButton  {
    href: string
    text: string
    variant?: ButtonProps["variant"]
    color?: ButtonProps["color"]
}

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

    logo: {
        paddingLeft: "5px",
        paddingRight: "8px",
        width: "70px",
        height: "70px",
    },

    navButtons: {
        "& > *": {
            marginRight: "5px"
        }
    }
});

interface IHeaderProps {
    classes: any;
    navButtons?: INavButton[];
}

class Header extends React.Component<IHeaderProps & React.HTMLAttributes<HTMLDivElement>> {
    render() {
        let { classes } = this.props
        return (
            <div className={`${classes.root} ${this.props.className}`}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <img className={classes.logo} src={logo} />
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
        let {navButtons} = this.props
        if (navButtons == undefined) {
            return
        }
        return (
            <>
                {
                    map(navButtons, (b)  => (
                        <Button
                            href={b.href}
                            color={b.color || "secondary"}
                            variant={b.variant || "outlined" }>
                            {b.text}
                        </Button>
                    ))
                }
            </>
        )
    }
}

export default withStyles(styles)(Header);
