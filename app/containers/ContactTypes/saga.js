import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showLoading, hideLoading } from '../../components/Progress/actions';
import { showError } from '../../components/NotificationCenter/actions';
import { apiRequest } from '../../api/ellegiaRequest';
import { makeSelectToken } from '../LoginPage/selectors';

import { LOAD_CONTACT_TYPES } from './constants';
import { loadContactTypesSuccess } from './actions';

export function* loadContactTypes() {
  const authHeader = yield select(makeSelectToken());
  const requestUrl = 'contactTypes';

  try {
    yield put(showLoading());
    const contactTypes = yield call(apiRequest(authHeader).get, requestUrl);
    yield all([put(loadContactTypesSuccess(contactTypes)), put(hideLoading())]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* contactTypesData() {
  yield takeLatest(LOAD_CONTACT_TYPES, loadContactTypes);
}
