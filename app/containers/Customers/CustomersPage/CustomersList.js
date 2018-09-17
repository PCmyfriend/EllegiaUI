import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Face from '@material-ui/icons/Face';

import List from '../../../components/List/List';
import ListItem from '../../../components/List/ListItem';
import ManageContactPage from '../../../containers/Customers/ManageContactPage';

const getContactsJsxArray = (contacts = fromJS([]), onDeleteContactClick) =>
  contacts
    .map(contact => (
      <ListItem nested key={contact.get('id')}>
        <ListItemText
          inset
          primary={contact.get('name')}
          secondary={contact.get('contactType').get('name')}
        />
        <ListItemSecondaryAction>
          <IconButton id={contact.get('id')} onClick={onDeleteContactClick}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
    .toArray();

const CustomersList = ({
  customers,
  onDeleteCustomerClick,
  onDeleteContactClick,
}) => (
  <List>
    {customers.map(customer => (
      <ListItem
        expandable={
          !!customer.get('contacts') && customer.get('contacts').size > 0
        }
        key={customer.get('id')}
        id={customer.get('id')}
        nestedItems={[
          ...getContactsJsxArray(
            customer.get('contacts'),
            onDeleteContactClick,
          ),
        ]}
        secondaryActions={[
          <ManageContactPage key={1} customerId={customer.get('id')} />,
          <IconButton
            id={customer.get('id')}
            key={2}
            onClick={onDeleteCustomerClick}
          >
            <DeleteIcon />
          </IconButton>,
        ]}
      >
        <ListItemIcon>
          <Face />
        </ListItemIcon>
        <ListItemText inset primary={customer.get('name')} />
      </ListItem>
    ))}
  </List>
);

CustomersList.propTypes = {
  customers: PropTypes.object.isRequired,
  onDeleteCustomerClick: PropTypes.func.isRequired,
  onDeleteContactClick: PropTypes.func.isRequired,
};

export default withStyles({})(CustomersList);
