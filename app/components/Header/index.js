/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import NavSideMenu from './NavSideMenu';
import HeaderLink from '../A';
import messages from './messages';
import image from '../../images/icon-512x512.png';
import { makeSelectUserRole, makeSelectUserName } from '../../containers/LoginPage/selectors';

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

class Header extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit">
              <HeaderLink to="/">
                <Avatar
                  src={image}
                  classes={{
                    root: 'nav-bar-icon',
                  }}
                />
              </HeaderLink>
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              <HeaderLink to="/">
                <FormattedMessage {...messages.header} />
              </HeaderLink>
            </Typography>
            {this.props.userRole ? (
              <NavSideMenu userName={this.props.userName} />
            ) : (
              <Button color="inherit">
                <HeaderLink to="/login">
                  <FormattedMessage {...messages.signIn} />
                </HeaderLink>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  userRole: PropTypes.string,
  classes: PropTypes.object.isRequired,
  userName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userRole: makeSelectUserRole(),
  userName: makeSelectUserName(),
});

export default connect(mapStateToProps)(withStyles(styles)(Header));
