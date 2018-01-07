import React from 'react';
import PropTypes from 'prop-types';
import Face from 'material-ui/svg-icons/action/face';
import { fromJS } from 'immutable';
import ManageContactPage from '../ManageContactPage';

import { List, ListItem } from 'material-ui/List';

const getContactsJsxArray = (contacts = fromJS([])) =>
  contacts.map((contact) =>
    (<ListItem
      key={contact.get('id')}
      primaryText={`${contact.get('contactType').get('name')}: ${contact.get('name')}`}
    />)
  ).toArray();

const CustomersList = ({ customers }) => (
  <List>
    {customers.map((customer) =>
      (<ListItem
        key={customer.get('id')}
        primaryText={customer.get('name')}
        leftIcon={<Face />}
        nestedItems={[
          ...getContactsJsxArray(customer.get('contacts')),
          <ListItem key={-1}><ManageContactPage customerId={customer.get('id')} /></ListItem>
        ]}
      />))}
  </List>
);

CustomersList.propTypes = {
  customers: PropTypes.object.isRequired,
};

export default CustomersList;
