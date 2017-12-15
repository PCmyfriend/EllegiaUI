import React from 'react';
import AppBar from 'material-ui/AppBar';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <AppBar
        title={<FormattedMessage {...messages.header} />}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}

export default Header;
