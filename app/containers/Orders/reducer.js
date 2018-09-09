import { fromJS } from 'immutable';

import {
  ADD_ORDER_SUCCESS,
  LOAD_ORDERS_SUCCESS,
  DELETE_ORDER_SUCCESS,
  SEND_ORDER_SUCCESS,
} from './constants';

const initialState = fromJS({
  active: [],
  completed: [],
  released: [],
});

export default function ordersReducer(state = initialState, action) {
  if (action.type === ADD_ORDER_SUCCESS) {
    return state.set('active', fromJS([...state.get('active'), action.order]));
  } else if (action.type === DELETE_ORDER_SUCCESS) {
    return state.set(
      'active',
      fromJS([
        ...state
          .get('active')
          .filter(
            o => parseInt(o.get('id'), 10) !== parseInt(action.orderId, 10),
          ),
      ]),
    );
  } else if (action.type === LOAD_ORDERS_SUCCESS) {
    return state.set(action.orderStatus, fromJS([...action.orders]));
  } else if (action.type === SEND_ORDER_SUCCESS) {
    const activeOrders = state.get('active').toJS();

    const newActiveOrders = [];
    for (let i = 0; i < activeOrders.length; i += 1) {
      const activeOrder = activeOrders[i];
      const newOrder =
        parseInt(activeOrder.id, 10) === parseInt(action.orderId, 10)
          ? Object.assign({}, activeOrder, { isMine: false })
          : Object.assign({}, activeOrder);
      newActiveOrders.push(newOrder);
    }

    return state.set('active', fromJS(newActiveOrders));
  }
  return state;
}
