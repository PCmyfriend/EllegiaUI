import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { FormattedMessage } from 'react-intl';
import HeaderLink from '../A';
import messages from './messages';

import { signOutUser } from '../../containers/LoginPage/actions';

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
  constructor(context, props) {
    super(context, props);

    this.state = {
      anchorEl: null,
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  handleSignOutClick() {
    this.props.signOut();
  }

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
        <Button
          className={this.props.classes.menuButton}
          color="inherit"
          aria-label="Menu"
          style={{ textTransform: 'none' }}
        >
          <Typography color="inherit" variant="subheading">
            <FormattedMessage {...messages.greeting} />
            {`${this.props.userName}!`}
          </Typography>
        </Button>
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
          <MenuItem onClick={this.handleSignOutClick}>
            <FormattedMessage {...messages.signOut} />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

NavSideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    signOut: () => {
      dispatch(signOutUser());
    },
  };
}

NavSideMenu.muiName = 'IconMenu';

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(NavSideMenu));
