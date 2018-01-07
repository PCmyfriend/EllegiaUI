import { fromJS } from 'immutable';

import {
  ADD_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  LOAD_CUSTOMERS_SUCCESS, ADD_CONTACT_SUCCESS,
} from './constants';

const initialState = fromJS([]);

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CUSTOMERS_SUCCESS:
      return fromJS(action.customers);
    case ADD_CUSTOMER_SUCCESS:
      return fromJS([...state, action.customer]);
    default:
      return state;
  }
}
