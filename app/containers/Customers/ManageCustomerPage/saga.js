import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { showLoading, hideLoading } from '../../../components/Progress/actions';
import {
  showSuccess,
  showError,
} from '../../../components/NotificationCenter/actions';
import { apiRequest } from '../../../api/ellegiaRequest';
import { makeSelectToken } from '../../LoginPage/selectors';

import { ADD_CUSTOMER, DELETE_CUSTOMER } from '../constants';
import { addCustomerSuccess, deleteCustomerSuccess } from '../actions';

export function* addCustomer(action) {
  let { customer } = action;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = 'customers/';

  try {
    yield put(showLoading());
    customer = yield call(apiRequest(authHeader).post, requestUrl, customer);
    yield all([
      put(addCustomerSuccess(customer)),
      put(hideLoading()),
      put(showSuccess()),
      put(push('/customers')),
    ]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError()), put(push('/customers'))]);
  }
}

export function* deleteCustomer(action) {
  const { customerId } = action;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `customers/${customerId}`;

  try {
    yield put(showLoading());
    yield call(apiRequest(authHeader).delete, requestUrl);
    yield all([
      put(deleteCustomerSuccess(customerId)),
      put(hideLoading()),
      put(showSuccess()),
    ]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* customersData() {
  yield [
    takeLatest(ADD_CUSTOMER, addCustomer),
    takeLatest(DELETE_CUSTOMER, deleteCustomer),
  ];
}
