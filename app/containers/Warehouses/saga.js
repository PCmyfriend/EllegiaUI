import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { apiRequest } from '../../api/ellegiaRequest';

import { showLoading, hideLoading } from '../../components/Progress/actions';
import {
  showSuccess,
  showError,
} from '../../components/NotificationCenter/actions';

import { makeSelectToken } from '../LoginPage/selectors';

import { takeWarehouseItemSuccess, putWarehouseItemSuccess } from './actions';

import { PUT_WAREHOUSE_ITEM, TAKE_WAREHOUSE_ITEM } from './constants';

export function* takeWarehouseItem(action) {
  const { warehouseId, warehouseItem } = action;

  const authHeader = yield select(makeSelectToken());

  const takeWarehouseItemRequestUrl = `warehouses/${warehouseId}/history/out`;

  try {
    yield put(showLoading());
    const warehouseDeliveryHistoryRecord = yield call(
      apiRequest(authHeader),
      takeWarehouseItemRequestUrl,
      warehouseItem,
    );
    yield all([
      put(showLoading()),
      put(showSuccess()),
      put(takeWarehouseItemSuccess(warehouseDeliveryHistoryRecord)),
    ]);
  } catch (error) {
    yield all([put(hideLoading(), showError())]);
  }
}

export function* putWarehouseItem(action) {
  const { warehouseId, warehouseItem } = action;

  const authHeader = yield select(makeSelectToken());

  const putWarehouseItemRequestUrl = `warehouses/${warehouseId}/history/in`;

  try {
    yield put(showLoading());
    const warehouseStokingHistoryRecord = yield call(
      apiRequest(authHeader),
      putWarehouseItemRequestUrl,
      warehouseItem,
    );
    yield all([
      put(showLoading()),
      put(showSuccess()),
      put(putWarehouseItemSuccess(warehouseStokingHistoryRecord)),
    ]);
  } catch (error) {
    yield all([put(hideLoading(), showError())]);
  }
}

export default function* warehouseHistoryData() {
  yield [
    takeLatest(PUT_WAREHOUSE_ITEM, putWarehouseItem),
    takeLatest(TAKE_WAREHOUSE_ITEM, takeWarehouseItem),
  ];
}
