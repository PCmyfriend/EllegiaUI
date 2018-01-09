import { fromJS } from 'immutable';

import {
  ADD_CUSTOMER_SUCCESS,
  LOAD_CUSTOMERS_SUCCESS,
  ADD_CONTACT_SUCCESS,
} from './constants';

const initialState = fromJS([]);

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CUSTOMERS_SUCCESS:
      return fromJS(action.customers);
    case ADD_CUSTOMER_SUCCESS:
      return fromJS([...state, action.customer]);
    case ADD_CONTACT_SUCCESS:
      const contact = action.contact;
      const customers = state.toJS();
      console.log(contact.customerId);
      for (let i = 0; i < customers.length; ++i) {
        console.log(customers[i]);
        if (customers[i].id === contact.customerId) {
          customers[i].contacts.push(contact);
        }
      }
      console.log(customers);
      return fromJS(customers);
    default:
      return state;
  }
}
