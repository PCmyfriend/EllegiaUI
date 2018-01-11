import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showLoading, hideLoading } from '../../../components/Progress/actions';
import { showSuccess, showError } from '../../../components/NotificationCenter/actions';
import { apiRequest } from '../../../api/ellegiaRequest';
import { makeSelectToken } from '../../LoginPage/selectors';
import { makeSelectContactById } from '../selectors';

import { ADD_CONTACT, DELETE_CONTACT } from '../constants';
import { addContactSuccess, deleteContactSuccess } from '../actions';

export function* addContact(action) {
  let contact = action.contact;
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
  const contactId = action.contactId;
  const contact = yield select(makeSelectContactById(contactId));
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `customers/${contact.get('customerId')}/contacts/${contact.get('id')}`;

  try {
    yield put(showLoading());
    yield call(apiRequest(authHeader).delete, requestUrl);
    yield all([put(deleteContactSuccess(contact)), put(hideLoading()), put(showSuccess())]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* contactsData() {
  yield [
    takeLatest(ADD_CONTACT, addContact),
    takeLatest(DELETE_CONTACT, deleteContact),
  ];
}
