import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { showLoading, hideLoading } from '../../components/Progress/actions';
import {
  showError,
  showSuccess,
} from '../../components/NotificationCenter/actions';
import { apiRequest } from '../../api/ellegiaRequest';
import { makeSelectToken } from '../LoginPage/selectors';

import {
  LOAD_PLASTIC_BAG_TYPES,
  ADD_PLASTIC_BAG_TYPE,
  DELETE_PLASTIC_BAG_TYPE,
  ADD_STANDARD_SIZE,
  DELETE_STANDARD_SIZE,
} from './constants';

import {
  loadPlasticBagTypesSuccess,
  addPlasticBagTypeSuccess,
  deletePlasticBagTypeSuccess,
  addStandardSizeSuccess,
  deleteStandardSizeSuccess,
} from './actions';

export function* loadPlasticBagTypes() {
  const authHeader = yield select(makeSelectToken());
  const requestUrl = 'plasticBagTypes';

  try {
    yield put(showLoading());
    const plasticBagTypes = yield call(apiRequest(authHeader).get, requestUrl);
    yield all([
      put(loadPlasticBagTypesSuccess(plasticBagTypes)),
      put(hideLoading()),
    ]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* addPlasticBagType(action) {
  let { plasticBagType } = action;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = 'plasticBagTypes';

  try {
    yield put(showLoading());
    plasticBagType = yield call(
      apiRequest(authHeader).post,
      requestUrl,
      plasticBagType,
    );
    yield all([
      put(addPlasticBagTypeSuccess(plasticBagType)),
      put(hideLoading()),
      put(showSuccess()),
      put(push('/plasticBagTypes')),
    ]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* deletePlasticBagType(action) {
  const { plasticBagTypeId } = action;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `plasticBagTypes/${plasticBagTypeId}`;

  try {
    yield put(showLoading());
    yield call(apiRequest(authHeader).delete, requestUrl);
    yield all([
      put(deletePlasticBagTypeSuccess(plasticBagTypeId)),
      put(hideLoading()),
      put(showSuccess()),
    ]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* addStandardSize(action) {
  let { standardSize } = action;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `plasticBagTypes/${
    standardSize.plasticBagTypeId
  }/standardSizes/`;

  try {
    yield put(showLoading());
    standardSize = yield call(
      apiRequest(authHeader).post,
      requestUrl,
      standardSize,
    );
    yield all([
      put(addStandardSizeSuccess(standardSize)),
      put(hideLoading()),
      put(showSuccess()),
    ]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* deleteStandardSize(action) {
  const { standardSizeId, plasticBagTypeId } = action;
  const authHeader = yield select(makeSelectToken());
  const requestUrl = `plasticBagTypes/${plasticBagTypeId}/standardSizes/${standardSizeId}`;

  try {
    yield put(showLoading());
    yield call(apiRequest(authHeader).delete, requestUrl);
    yield all([
      put(deleteStandardSizeSuccess(standardSizeId)),
      put(hideLoading()),
      put(showSuccess()),
    ]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* plasticBagTypesData() {
  yield [
    takeLatest(LOAD_PLASTIC_BAG_TYPES, loadPlasticBagTypes),
    takeLatest(ADD_PLASTIC_BAG_TYPE, addPlasticBagType),
    takeLatest(DELETE_PLASTIC_BAG_TYPE, deletePlasticBagType),
    takeLatest(ADD_STANDARD_SIZE, addStandardSize),
    takeLatest(DELETE_STANDARD_SIZE, deleteStandardSize),
  ];
}
