import { LOAD_CUSTOMERS, LOAD_CUSTOMERS_SUCCESS } from './constants';

export function loadCustomers() {
  return {
    type: LOAD_CUSTOMERS,
  };
}

export function loadCustomersSuccess(customers) {
  return {
    type: LOAD_CUSTOMERS_SUCCESS,
    customers,
  };
}
