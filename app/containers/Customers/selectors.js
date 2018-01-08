import { createSelector } from 'reselect';

const selectCustomers = (state) => state.get('customers');

const makeSelectCustomers = () => createSelector(
  selectCustomers,
  (customersState) => customersState,
);

export {
  selectCustomers,
  makeSelectCustomers,
};
