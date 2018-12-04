import * as React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = ({palette}: Theme) => createStyles({
  root: {
      background: `linear-gradient(45deg, ${palette.primary.dark} 30%, ${palette.primary.light} 90%)`,
  },
});

interface IHeaderProps {
    classes: any;
}

class Header extends React.Component<IHeaderProps & React.HTMLAttributes<HTMLDivElement>> {
    render() {
        return (
            <AppBar position="static" className={this.props.classes.root}>
                <Toolbar>
                    <Typography variant="h4" color="inherit">
                        Swap My Room
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Header);
