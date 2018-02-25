import { fromJS } from 'immutable';

import {
  ADD_ORDER_SUCCESS,
  LOAD_ORDERS_SUCCESS,
  DELETE_ORDER_SUCCESS,
} from './constants';

const initialState = fromJS({
  active: [],
  completed: [],
  released: [],
});

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER_SUCCESS: {
      return state
        .set('active', fromJS([...state.get('active'), action.order]));
    }
    case DELETE_ORDER_SUCCESS:
      return state
        .set('active', fromJS([...state.get('active').filter((o) => o.get('id') == action.orderId)]));
    case LOAD_ORDERS_SUCCESS:
      return state
        .set(action.orderStatus, fromJS([...action.orders]));
    default:
      return state;
  }
}
