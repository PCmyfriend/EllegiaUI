import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

import { FormattedMessage } from 'react-intl';
import HeaderLink from '../A';
import messages from './messages';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavSideMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem>
            <FormattedMessage {...messages.assortment} />
          </MenuItem>
          <MenuItem>
            <HeaderLink to="/">
              <FormattedMessage {...messages.orders} />
            </HeaderLink>
          </MenuItem>
          <MenuItem>
            <HeaderLink to="/customers">
              <FormattedMessage {...messages.customers} />
            </HeaderLink>
          </MenuItem>
          <MenuItem>
            <HeaderLink to="/handbooks">
              <FormattedMessage {...messages.handbooks} />
            </HeaderLink>
          </MenuItem>
          <Divider />
          <MenuItem>
            <FormattedMessage {...messages.signOut} />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

NavSideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

NavSideMenu.muiName = 'IconMenu';

export default withStyles(styles)(NavSideMenu);
