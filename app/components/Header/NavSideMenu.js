import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
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
    <MenuItem primaryText={<FormattedMessage {...messages.assortment} />} />
    <MenuItem primaryText={<FormattedMessage {...messages.orders} />} />
    <MenuItem primaryText={<FormattedMessage {...messages.customers} />} />
    <MenuItem primaryText={<FormattedMessage {...messages.handbooks} />} />
    <Divider />
    <MenuItem primaryText={<FormattedMessage {...messages.sign_out} />} />
  </IconMenu>
);

NavSideMenu.muiName = 'IconMenu';

export default NavSideMenu;
