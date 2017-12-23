import { fromJS } from 'immutable';

import {
  LOAD_CUSTOMERS_SUCCESS,
} from './constants';

const initialState = fromJS([]);

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CUSTOMERS_SUCCESS:
      return state
        .set(action.customers);
    default:
      return state;
  }
}
