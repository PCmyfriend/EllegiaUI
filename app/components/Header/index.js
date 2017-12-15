import React from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import { FormattedMessage } from 'react-intl';
import NavSideMenu from './NavSideMenu';
import HeaderLink from '../A';
import messages from './messages';
import image from '../../images/icon-512x512.png';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <AppBar
        title={<HeaderLink to="/"><FormattedMessage {...messages.header} /></HeaderLink>}
        iconElementLeft={<HeaderLink to="/"><Avatar src={image} /></HeaderLink>}
        iconElementRight={<NavSideMenu />}
      />
    );
  }
}

export default Header;
