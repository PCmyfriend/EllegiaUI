import { createSelector } from 'reselect';

const selectOrders = (state) => state.get('orders');

const makeSelectOrdersByStatus = (orderStatus) => createSelector(
  selectOrders,
  (ordersState) => ordersState.get(orderStatus) || [],
);

return {
  selectOrders,
  makeSelectOrdersByStatus,
};
