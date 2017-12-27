import { createSelector } from 'reselect';

const selectCustomers = (state) => state.get('customers');

const makeSelectCustomers = () => createSelector(
  selectCustomers,
  (customersState) => customersState,
);

const makeSelectLastCustomer = () => createSelector(
  selectCustomers,
  (customersState) => customersState.get(customersState.size - 1),
);

export {
  selectCustomers,
  makeSelectCustomers,
  makeSelectLastCustomer,
};
