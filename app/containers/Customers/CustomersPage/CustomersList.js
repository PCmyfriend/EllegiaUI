import React from 'react';
import PropTypes from 'prop-types';
import Face from 'material-ui/svg-icons/action/face';

import { List, ListItem } from 'material-ui/List';

const getContactsJsxArray = (contacts = []) =>
  contacts.map((contact) =>
    (<ListItem
      key={contact.get('id')}
      primaryText={contact.get('name')}
    />)
  ).toArray();

const CustomersList = ({ customers }) => (
  <List>
    {customers.map((customer) =>
      (<ListItem
        key={customer.get('id')}
        primaryText={customer.get('name')}
        leftIcon={<Face />}
        nestedItems={getContactsJsxArray(customer.get('contacts'))}
      />))}
  </List>
);

CustomersList.propTypes = {
  customers: PropTypes.object.isRequired,
};

export default CustomersList;
