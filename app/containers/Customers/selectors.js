/* eslint-disable eqeqeq */
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectCustomers = state => state.get('customers');

const makeSelectCustomers = () =>
  createSelector(selectCustomers, customersState => customersState);

const makeSelectContactById = id =>
  createSelector(selectCustomers, customersState => {
    let result;

    customersState.forEach(c => {
      const contacts = (c.get('contacts') || fromJS([])).toJS();
      for (let i = 0; i < contacts.length; i += 1) {
        if (contacts[i].id == id) {
          result = fromJS(contacts[i]);
          break;
        }
      }
    });

    return result;
  });

export { selectCustomers, makeSelectCustomers, makeSelectContactById };
