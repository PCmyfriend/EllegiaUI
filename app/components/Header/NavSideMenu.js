import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const NavSideMenu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText={<FormattedMessage {...messages.handbooks} />} />
    <MenuItem primaryText={<FormattedMessage {...messages.sign_out} />} />
  </IconMenu>
);

NavSideMenu.muiName = 'IconMenu';

export default NavSideMenu;
