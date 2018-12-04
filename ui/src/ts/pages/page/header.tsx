import * as React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = ({palette}: Theme) => createStyles({
    root: {
        position: 'sticky',
        width: '100%',
        zIndex: 1100,
        top: '0px',
        right: '0px'
    },
    appBar: {
        paddingTop: "0.5em",
        paddingBottom: "0.5em",
    },
});

interface IHeaderProps {
    classes: any;
}

class Header extends React.Component<IHeaderProps & React.HTMLAttributes<HTMLDivElement>> {
    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar position="static" className={this.props.classes.appBar}>
                    <Toolbar>
                        <Typography variant="h4" color="inherit">
                            Swap My Room
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Header);
