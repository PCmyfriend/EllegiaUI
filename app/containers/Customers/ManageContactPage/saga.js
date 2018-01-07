import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { showLoading, hideLoading } from '../../../components/Progress/actions';
import { showError } from '../../../components/NotificationCenter/actions';
import { apiRequest } from '../../../api/ellegiaRequest';
import { makeSelectToken } from '../../LoginPage/selectors';

import { ADD_CONTACT } from '../constants';
import { addContactSuccess } from '../actions';

export function* addContact(action) {
  let contact = action.contact;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `customers/${contact.customerId}/contacts/`;

  try {
    yield put(showLoading());
    contact = yield call(apiRequest(authHeader).post, requestUrl, contact);
    yield all([put(addContactSuccess(contact)), put(hideLoading()), put(push('/customers'))]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* contactsData() {
  yield takeLatest(ADD_CONTACT, addContact);
}
