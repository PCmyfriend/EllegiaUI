import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showLoading, hideLoading } from '../../components/Progress/actions';
import {
  showError,
  showSuccess,
} from '../../components/NotificationCenter/actions';
import { apiRequest } from '../../api/ellegiaRequest';
import { makeSelectToken } from '../LoginPage/selectors';

import { ADD_CONTACT, LOAD_CUSTOMERS, DELETE_CONTACT } from './constants';
import {
  loadCustomersSuccess,
  deleteContactSuccess,
  addContactSuccess,
} from './actions';
import { makeSelectContactById } from './selectors';

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

export function* addContact(action) {
  let { contact } = action;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `customers/${contact.customerId}/contacts/`;

  try {
    yield put(showLoading());
    contact = yield call(apiRequest(authHeader).post, requestUrl, contact);
    yield all([put(addContactSuccess(contact)), put(hideLoading())]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* deleteContact(action) {
  const { contactId } = action;
  const contact = yield select(makeSelectContactById(contactId));
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `customers/${contact.get(
    'customerId',
  )}/contacts/${contact.get('id')}`;

  try {
    yield put(showLoading());
    yield call(apiRequest(authHeader).delete, requestUrl);
    yield all([
      put(deleteContactSuccess(contact)),
      put(hideLoading()),
      put(showSuccess()),
    ]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* customersData() {
  yield [
    takeLatest(LOAD_CUSTOMERS, loadCustomers),
    takeLatest(ADD_CONTACT, addContact),
    takeLatest(DELETE_CONTACT, deleteContact),
  ];
}
