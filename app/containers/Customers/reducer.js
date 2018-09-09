/* eslint-disable eqeqeq */
import { fromJS } from 'immutable';

import {
  ADD_CUSTOMER_SUCCESS,
  LOAD_CUSTOMERS_SUCCESS,
  ADD_CONTACT_SUCCESS,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CONTACT_SUCCESS,
} from './constants';

const initialState = fromJS([]);

const getCustomerById = (customers, id) => {
  for (let i = 0; i < customers.length; i += 1) {
    if (customers[i].id === id) {
      return customers[i];
    }
  }
  return undefined;
};

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CUSTOMERS_SUCCESS:
      return fromJS(action.customers);
    case ADD_CUSTOMER_SUCCESS:
      return fromJS([...state, action.customer]);
    case ADD_CONTACT_SUCCESS: {
      const { contact } = action;
      const customers = state.toJS();
      const customer = getCustomerById(customers, contact.customerId);
      customer.contacts.push(contact);
      return fromJS(customers);
    }
    case DELETE_CUSTOMER_SUCCESS:
      return fromJS([...state.filter(c => c.get('id') != action.customerId)]);
    case DELETE_CONTACT_SUCCESS: {
      const contactForDeletion = action.contact.toJS();
      const customers1 = state.toJS();
      const customer1 = getCustomerById(
        customers1,
        contactForDeletion.customerId,
      );
      customer1.contacts = (customer1.contacts || []).filter(
        c => c.id != contactForDeletion.id,
      );
      return fromJS(customers1);
    }
    default:
      return state;
  }
}
