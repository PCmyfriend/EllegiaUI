import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showLoading, hideLoading } from '../../../components/Progress/actions';
import { showError } from '../../../components/NotificationCenter/actions';
import { apiRequest } from '../../../api/ellegiaRequest';
import { makeSelectToken } from '../../LoginPage/selectors';

import { LOAD_FILM_TYPES } from '../constants';
import { loadFilmTypesSuccess } from '../actions';

export function* loadFilmTypes() {
  const authHeader = yield select(makeSelectToken());
  const requestUrl = 'filmTypes';

  try {
    yield put(showLoading());
    const filmTypes = yield call(apiRequest(authHeader).get, requestUrl);
    yield all([put(loadFilmTypesSuccess(filmTypes)), put(hideLoading())]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* filmTypesData() {
  yield takeLatest(LOAD_FILM_TYPES, loadFilmTypes);
}
