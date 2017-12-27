import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from 'material-ui/List';

const CustomersList = ({ customers }) => (
  <List>
    {customers.map((customer) =>
      (<ListItem
        key={customer.get('id')}
        primaryText={customer.get('name')}
        nestedItems={
          getContactsJsxArray(customer.get('contacts'))
        }
      />))}
  </List>
);

function getContactsJsxArray(contacts) {
  if (!contacts) { return []; }

  const array = [];
  for (let i = 0; i < contacts.size; i += 1) {
    const contact = contacts.get(i);
    array.push(<ListItem
      key={contact.get('id')}
      primaryText={contact.get('name')}
    />);
  }
  return array;
}

CustomersList.propTypes = {
  customers: PropTypes.object.isRequired,
};

export default CustomersList;
