import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showLoading, hideLoading } from '../../../components/Progress/actions';
import { showError } from '../../../components/NotificationCenter/actions';
import { apiRequest } from '../../../api/ellegiaRequest';
import { makeSelectToken } from '../../LoginPage/selectors';

import { LOAD_CUSTOMERS } from '../constants';
import { loadCustomersSuccess } from '../actions';

export function* loadCustomers() {
  const authHeader = yield select(makeSelectToken());
  const requestUrl = 'customers';

  try {
    yield put(showLoading());
    const customers = yield call(apiRequest(authHeader).get, requestUrl);
    yield all([put(loadCustomersSuccess(customers)), put(hideLoading())]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* customersData() {
  yield takeLatest(LOAD_CUSTOMERS, loadCustomers);
}
