import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { ADD_ORDER, LOAD_ORDERS, DELETE_ORDER } from './constants';
import { addOrderSuccess, loadOrdersSuccess, deleteOrderSuccess } from './actions';
import { showLoading, hideLoading } from '../../components/Progress/actions';
import { showSuccess, showError } from '../../components/NotificationCenter/actions';

import { apiRequest } from '../../api/ellegiaRequest';

import { makeSelectToken } from '../LoginPage/selectors';

export function* loadOrders(action) {
  const orderStatus = action.orderStatus;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `orders/${orderStatus}`;

  try {
    yield put(showLoading());
    const orders = yield call(apiRequest(authHeader).get, requestUrl);
    yield all([put(loadOrdersSuccess(orders)), put(hideLoading())]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* addOrder(action) {
  const orderViewModel = action.order.toJS();
  const authHeader = yield select(makeSelectToken());
  const productTypeRequestUrl = 'productTypes';
  const orderRequestUrl = 'orders';

  let productType = {
    name: orderViewModel.name,
    standardSizeId: orderViewModel.standardSizeId,
    filmTypeOptionId: orderViewModel.filmTypeOptionId,
    colorId: orderViewModel.colorId,
    hasCorona: orderViewModel.hasCorona,
    thicknessInMicron: orderViewModel.thicknessInMicron,
    heightInMmError: orderViewModel.heightInMmError,
    widthInMmError: orderViewModel.widthInMmError,
    lengthInMmError: orderViewModel.lengthInMmError,
    thicknessInMicronError: orderViewModel.thicknessInMicronError,
  };

  let order = {
    warehouseId: 1,
    customerId: orderViewModel.customerId,
    quantityInKg: orderViewModel.quantityInKg,
    pricePerKg: orderViewModel.pricePerKg,
  };

  try {
    yield put(showLoading());
    productType = yield call(apiRequest(authHeader).post, productTypeRequestUrl, productType);
    order.productTypeId = productType.id;
    order = yield call(apiRequest(authHeader).post, orderRequestUrl, order);
    yield all([put(addOrderSuccess(order)), put(hideLoading()), put(showSuccess()), put(push('/'))]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* deleteOrder(action) {
  const orderId = action.orderId;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `orders/${orderId}`;

  try {
    yield put(showLoading());
    yield call(apiRequest(authHeader).delete, requestUrl);
    yield all([put(deleteOrderSuccess(orderId)), put(hideLoading()), put(showSuccess())]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}
export default function* ordersData() {
  yield [
    takeLatest(LOAD_ORDERS, loadOrders),
    takeLatest(ADD_ORDER, addOrder),
    takeLatest(DELETE_ORDER, deleteOrder),
  ];
}
