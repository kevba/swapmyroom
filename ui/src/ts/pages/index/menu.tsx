import * as React from 'react';


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

interface IMenuProps {}

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
            onClick={this.handleClick}>
            <MenuIcon />
        </IconButton>
        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <a href="#wie_zijn_wij?">
              <MenuItem > Wie zijn wij? </MenuItem>
          </a>
          <MenuItem href="#missie_&_visie"> Missie & Visie </MenuItem>
          <MenuItem href="#organisatie"> Organisatie </MenuItem>
          <MenuItem href="#sign_up"> Sign up </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default NavMenu;
