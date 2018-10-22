import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { apiRequest } from '../../api/ellegiaRequest';

import { showLoading, hideLoading } from '../../components/Progress/actions';
import {
  showSuccess,
  showError,
} from '../../components/NotificationCenter/actions';

import { makeSelectToken } from '../LoginPage/selectors';

import {
  addWarehouseHistoryRecordSuccess,
  loadWarehouseHistorySuccess,
} from './actions';

import {
  LOAD_WAREHOUSE_HISTORY,
  ADD_WAREHOUSE_HISTORY_RECORD,
} from './constants';

export function* addWarehouseHistoryRecord(action) {
  const { warehouseId, warehouseHistoryRecord } = action;

  const authHeader = yield select(makeSelectToken());

  const requestUrl = `warehouses/${warehouseId}/history`;

  try {
    yield put(showLoading());
    yield call(apiRequest(authHeader).post, requestUrl, warehouseHistoryRecord);
    yield all([
      put(hideLoading()),
      put(showSuccess()),
      put(
        addWarehouseHistoryRecordSuccess(warehouseId, warehouseHistoryRecord),
      ),
    ]);
  } catch (error) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export function* loadWarehouseHistory(action) {
  const { warehouseId } = action;

  const authHeader = yield select(makeSelectToken());

  const requestUrl = `warehouses/${warehouseId}/history`;

  try {
    yield put(showLoading());
    const warehouseHistory = yield call(apiRequest(authHeader).get, requestUrl);
    yield all([
      put(hideLoading()),
      put(showSuccess()),
      put(loadWarehouseHistorySuccess(warehouseId, warehouseHistory)),
    ]);
  } catch (error) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* warehouseHistoryData() {
  yield [
    takeLatest(LOAD_WAREHOUSE_HISTORY, loadWarehouseHistory),
    takeLatest(ADD_WAREHOUSE_HISTORY_RECORD, addWarehouseHistoryRecord),
  ];
}
