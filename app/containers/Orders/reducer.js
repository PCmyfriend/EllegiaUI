import { fromJS } from 'immutable';

import {
  ON_EDITING,
  ACTIVE,
  ACTIVE_PARTIALLY_RELEASED,
  COMPLETED,
  RELEASED,
  CLOSED,
} from './orderStatuses';

import {
  ADD_ORDER_SUCCESS,
  LOAD_ORDERS_SUCCESS,
  DELETE_ORDER_SUCCESS,
  SEND_ORDER_SUCCESS,
} from './constants';

const initialState = fromJS(
  (() => {
    const state = {};
    state[ON_EDITING] = [];
    state[ACTIVE] = [];
    state[ACTIVE_PARTIALLY_RELEASED] = [];
    state[COMPLETED] = [];
    state[RELEASED] = [];
    state[CLOSED] = [];
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
    const activeOrders = state.get(ON_EDITING).toJS();

    const newActiveOrders = [];
    for (let i = 0; i < activeOrders.length; i += 1) {
      const activeOrder = activeOrders[i];
      const newOrder =
        parseInt(activeOrder.id, 10) === parseInt(action.orderId, 10)
          ? Object.assign({}, activeOrder, { isMine: false })
          : Object.assign({}, activeOrder);
      newActiveOrders.push(newOrder);
    }

    return state.set(ON_EDITING, fromJS(newActiveOrders));
  }
  return state;
}
