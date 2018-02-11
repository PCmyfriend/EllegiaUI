import {
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  LOAD_ORDERS,
  LOAD_ORDERS_SUCCESS,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
} from './constants';

export function addOrder(order) {
  return {
    type: ADD_ORDER,
    order,
  };
}

export function addOrderSuccess(order) {
  return {
    type: ADD_ORDER_SUCCESS,
    order,
  };
}

export function loadOrders(orderStatus) {
  return {
    type: LOAD_ORDERS,
    orderStatus,
  };
}

export function loadOrdersSuccess(orderStatus, orders) {
  return {
    type: LOAD_ORDERS_SUCCESS,
    orderStatus,
    orders,
  };
}

export function deleteOrder(orderId) {
  return {
    type: DELETE_ORDER,
    orderId,
  };
}

export function deleteOrderSuccess(orderId) {
  return {
    type: DELETE_ORDER_SUCCESS,
    orderId,
  };
}

