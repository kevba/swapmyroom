import * as React from 'react';

import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

import Page from '../page/page';

// import Welcome from './parts/welcome'
import About from './parts/about'
import Organisation from './parts/organisation'
import Mission from './parts/mission'
import Lander from './parts/lander'
import Form from './parts/form'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = ({palette}: Theme) => createStyles({
  menuButton: {
    color: palette.grey[50],
  },
});

interface IMenuProps {
    classes: any
}

interface IMenuState {
    anchorEl?: any
}

class NavMenu extends React.Component<IMenuProps, IMenuState> {
    constructor(props: IMenuProps) {
        super(props);

        this.state = {
            anchorEl: null
        };
    }

  handleClick = (event: any) => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <IconButton
            className={this.props.classes.menuButton}
            onClick={this.handleClick}>
            <MenuIcon />
        </IconButton>
        <Menu
            id="nav-menu"
            color="primary"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}>
            <a href="#missie_&_visie">
                <MenuItem onClick={this.handleClose}> Missie & Visie </MenuItem>
            </a>
            <a href="#wie_zijn_wij?">
                <MenuItem onClick={this.handleClose}> Wie zijn wij? </MenuItem>
            </a>
            <a href="#organisatie">
                <MenuItem onClick={this.handleClose}> Organisatie </MenuItem>
            </a>
            <a href="#5-swappenplan">
                <MenuItem onClick={this.handleClose}> 5-Swappenplan </MenuItem>
            </a>
            <a href="#meld_je_aan">
                <MenuItem onClick={this.handleClose}> Meld je aan </MenuItem>
            </a>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(NavMenu);
