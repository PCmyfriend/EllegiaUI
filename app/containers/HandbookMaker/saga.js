import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { showLoading, hideLoading } from '../../components/Progress/actions';
import { showError, showSuccess } from '../../components/NotificationCenter/actions';
import { apiRequest } from '../../api/ellegiaRequest';
import { makeSelectToken } from '../LoginPage/selectors';

import { LOAD_HANDBOOK_VALUES, ADD_HANDBOOK_VALUE, DELETE_HANDBOOK_VALUE } from './constants';
import { loadHandbookValuesSuccess, addHandbookValueSuccess, deleteHandbookValueSuccess } from './actions';

export function* loadHandbookValues(action) {
  const authHeader = yield select(makeSelectToken());
  const requestUrl = action.name;

  try {
    yield put(showLoading());
    const handbookValues = yield call(apiRequest(authHeader).get, requestUrl);
    yield all([put(loadHandbookValuesSuccess(action.name, handbookValues)), put(hideLoading())]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* addHandbookValue(action) {
  let handbookValue = action.value;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = action.name;

  try {
    yield put(showLoading());
    handbookValue = yield call(apiRequest(authHeader).post, requestUrl, handbookValue);
    yield all([put(addHandbookValueSuccess(handbookValue)), put(hideLoading()), put(showSuccess()), put(push(`/${action.name}`))]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* deleteHandbookValue(action) {
  const handbookValueId = action.valueId;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `${action.name}/${handbookValueId}`;

  try {
    yield put(showLoading());
    yield call(apiRequest(authHeader).delete, requestUrl);
    yield all([put(deleteHandbookValueSuccess(action.name, handbookValueId)), put(hideLoading()), put(showSuccess())]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* handbookValuesData() {
  yield [
    takeLatest(LOAD_HANDBOOK_VALUES, loadHandbookValues),
    takeLatest(ADD_HANDBOOK_VALUE, addHandbookValue),
    takeLatest(DELETE_HANDBOOK_VALUE, deleteHandbookValue),
  ];
}
