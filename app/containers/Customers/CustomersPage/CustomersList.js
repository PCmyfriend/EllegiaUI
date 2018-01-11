import React from 'react';
import PropTypes from 'prop-types';
import Face from 'material-ui/svg-icons/action/face';
import { fromJS } from 'immutable';
import { List, ListItem } from 'material-ui/List';
import ManageContactPage from '../ManageContactPage';

import IconButton from 'material-ui/IconButton';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever'
import { grey400 } from 'material-ui/styles/colors';

const getContactsJsxArray = (contacts = fromJS([]), onDeleteContactClick) =>
  contacts.map((contact) =>
    (<ListItem
      key={contact.get('id')}
      rightIconButton={
        <IconButton
          id={contact.get('id')}
          onClick={onDeleteContactClick}
          touch={true}>
          <DeleteForeverIcon color={grey400} />
        </IconButton>
      }
      primaryText={contact.get('name')}
      secondaryText={contact.get('contactType').get('name')}
    />)
  ).toArray();

const CustomersList = ({ customers, onCustomerClick, expendedCustomers, onDeleteCustomerClick, onDeleteContactClick }) => (
  <List>
    {customers.map((customer) =>
      (<ListItem
        key={customer.get('id')}
        id={customer.get('id')}
        leftIcon={<Face />}
        rightIconButton={
          <IconButton
            id={customer.get('id')}
            touch={true}
            onClick={onDeleteCustomerClick}>
            <DeleteForeverIcon color={grey400} />
          </IconButton>
        }
        primaryText={customer.get('name')}
        onClick={onCustomerClick}
        open={expendedCustomers[customer.get('id')] || false}
        nestedItems={[
          ...getContactsJsxArray(customer.get('contacts'), onDeleteContactClick),
          <ListItem key={-customer.get('id')}><ManageContactPage customerId={customer.get('id')} /></ListItem>
        ]}
      />))}
  </List>
);

CustomersList.propTypes = {
  customers: PropTypes.object.isRequired,
  onCustomerClick: PropTypes.func.isRequired,
  expendedCustomers: PropTypes.object.isRequired,
  onDeleteCustomerClick: PropTypes.func.isRequired,
  onDeleteContactClick: PropTypes.func.isRequired,
};

export default CustomersList;
