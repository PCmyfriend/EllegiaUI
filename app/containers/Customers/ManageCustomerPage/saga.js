import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { showLoading, hideLoading } from '../../../components/Progress/actions';
import { showSuccess, showError } from '../../../components/NotificationCenter/actions';
import { apiRequest } from '../../../api/ellegiaRequest';
import { makeSelectToken } from '../../LoginPage/selectors';

import { ADD_CUSTOMER } from '../constants';
import { addCustomerSuccess, addCustomerFailure } from '../actions';

import { makeSelectLastCustomer } from '../selectors';

export function* addCustomer() {
  const authHeader = yield select(makeSelectToken());
  const requestUrl = 'customers/';
  const lastCustomer = yield select(makeSelectLastCustomer());

  try {
    yield put(showLoading());
    const customer = yield call(apiRequest(authHeader).post, requestUrl, lastCustomer);
    yield all([put(addCustomerSuccess(customer)), put(hideLoading()), put(showSuccess()), put(push('/customers'))]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError()), put(addCustomerFailure()), put(push('/customers'))]);
  }
}

export default function* customersData() {
  yield takeLatest(ADD_CUSTOMER, addCustomer);
}
