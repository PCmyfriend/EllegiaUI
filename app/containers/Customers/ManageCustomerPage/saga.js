import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { showLoading, hideLoading } from '../../../components/Progress/actions';
import { showSuccess, showError } from '../../../components/NotificationCenter/actions';
import { apiRequest } from '../../../api/ellegiaRequest';
import { makeSelectToken } from '../../LoginPage/selectors';

import { ADD_CUSTOMER } from '../constants';
import { addCustomerSuccess } from '../actions';

export function* addCustomer(action) {
  let customer = action.customer;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = 'customers/';

  try {
    yield put(showLoading());
    customer = yield call(apiRequest(authHeader).post, requestUrl, customer);
    yield all([put(addCustomerSuccess(customer)), put(hideLoading()), put(showSuccess()), put(push('/customers'))]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError()), put(push('/customers'))]);
  }
}

export default function* customersData() {
  yield takeLatest(ADD_CUSTOMER, addCustomer);
}
