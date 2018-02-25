import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectOrders = (state) => state.get('orders');

const makeSelectOrdersByStatus = (orderStatus) => createSelector(
  selectOrders,
  (ordersState) => ordersState.get(orderStatus) || fromJS([]),
);

export {
  selectOrders,
  makeSelectOrdersByStatus,
};
