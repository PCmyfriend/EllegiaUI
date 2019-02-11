import { fromJS } from 'immutable';

import { ON_EDITING, ALL } from './orderStatuses';

import {
  ADD_ORDER_SUCCESS,
  LOAD_ORDERS_SUCCESS,
  DELETE_ORDER_SUCCESS,
  SEND_ORDER_SUCCESS,
} from './constants';

const initialState = fromJS(
  (() => {
    const state = {};
    ALL.forEach(status => {
      state[status] = [];
    });
    return state;
  })(),
);

export default function ordersReducer(state = initialState, action) {
  if (action.type === ADD_ORDER_SUCCESS) {
    return state.set(
      ON_EDITING,
      fromJS([...state.get(ON_EDITING), action.order]),
    );
  } else if (action.type === DELETE_ORDER_SUCCESS) {
    return state.set(
      ON_EDITING,
      fromJS([
        ...state
          .get(ON_EDITING)
          .filter(
            o => parseInt(o.get('id'), 10) !== parseInt(action.orderId, 10),
          ),
      ]),
    );
  } else if (action.type === LOAD_ORDERS_SUCCESS) {
    return state.set(action.orderStatus, fromJS([...action.orders]));
  } else if (action.type === SEND_ORDER_SUCCESS) {
    const { orderRoute, orderId } = action;
    const { oldOrderStatus, newOrderStatus } = orderRoute;

    const sourceOrders = state.get(oldOrderStatus).toJS();

    let sentOrder = null;

    const newSourceOrders = [];
    for (let i = 0; i < sourceOrders.length; i += 1) {
      const order = sourceOrders[i];
      if (parseInt(order.id, 10) !== parseInt(orderId, 10)) {
        newSourceOrders.push(order);
      } else {
        sentOrder = order;
      }
    }

    const isOrderStatusChanged = oldOrderStatus !== newOrderStatus;

    const destinationOrders = !isOrderStatusChanged
      ? newSourceOrders
      : state.get(newOrderStatus).toJS();

    if (sentOrder != null) {
      sentOrder = Object.assign({}, sentOrder, { isMine: false });

      if (parseInt(newOrderStatus, 10) !== ON_EDITING) {
        sentOrder = Object.assign({}, sentOrder, {
          isDeletionPermitted: false,
        });
      }

      destinationOrders.unshift(sentOrder);
    }

    if (isOrderStatusChanged) {
      return state
        .set(oldOrderStatus, fromJS(newSourceOrders))
        .set(newOrderStatus, fromJS(destinationOrders));
    }

    return state.set(newOrderStatus, fromJS(destinationOrders));
  }
  return state;
}
