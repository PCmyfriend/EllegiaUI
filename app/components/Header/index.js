import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import NavSideMenu from './NavSideMenu';
import HeaderLink from '../A';
import messages from './messages';
import image from '../../images/icon-512x512.png';
import { makeSelectUserRole } from '../../containers/LoginPage/selectors';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <AppBar
        title={<HeaderLink to="/"><FormattedMessage {...messages.header} /></HeaderLink>}
        iconElementLeft={<HeaderLink to="/"><Avatar src={image} /></HeaderLink>}
        iconElementRight={this.props.userRole
          ? <NavSideMenu />
          : <FlatButton label={<HeaderLink to="/login"><FormattedMessage {...messages.signIn} /></HeaderLink>} />
        }
      />
    );
  }
}

Header.propTypes = {
  userRole: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userRole: makeSelectUserRole(),
});

export default connect(mapStateToProps)(Header);
