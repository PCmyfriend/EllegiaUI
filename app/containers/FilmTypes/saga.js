import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { showLoading, hideLoading } from '../../components/Progress/actions';
import { showError, showSuccess } from '../../components/NotificationCenter/actions';
import { apiRequest } from '../../api/ellegiaRequest';
import { makeSelectToken } from '../LoginPage/selectors';

import { ADD_FILM_TYPE, DELETE_FILM_TYPE, LOAD_FILM_TYPES} from './constants';
import { loadFilmTypesSuccess, addFilmTypeSuccess, deleteFilmTypeSuccess} from './actions';

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

export function* addFilmType(action) {
  let filmType = action.filmType;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = 'filmTypes';

  try {
    yield put(showLoading());
    filmType = yield call(apiRequest(authHeader).post, requestUrl, filmType);
    yield all([put(addFilmTypeSuccess(filmType)), put(hideLoading()), put(showSuccess()), put(push('/filmTypes'))]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* deleteFilmType(action) {
  const filmTypeId = action.filmTypeId;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `filmTypes/${filmTypeId}`;

  try {
    yield put(showLoading());
    yield call(apiRequest(authHeader).delete, requestUrl);
    yield all([put(deleteFilmTypeSuccess(filmTypeId)), put(hideLoading()), put(showSuccess())]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* filmTypesData() {
  yield [
    takeLatest(LOAD_FILM_TYPES, loadFilmTypes),
    takeLatest(ADD_FILM_TYPE, addFilmType),
    takeLatest(DELETE_FILM_TYPE, deleteFilmType),
  ];
}
