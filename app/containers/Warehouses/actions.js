import {
  ADD_WAREHOUSE_HISTORY_RECORD,
  ADD_WAREHOUSE_HISTORY_RECORD_SUCCESS,
  LOAD_WAREHOUSE_HISTORY,
  LOAD_WAREHOUSE_HISTORY_SUCCESS,
} from './constants';

export function addWarehouseHistoryRecord(warehouseId, warehouseHistoryRecord) {
  return {
    type: ADD_WAREHOUSE_HISTORY_RECORD,
    warehouseHistoryRecord,
    warehouseId,
  };
}

export function addWarehouseHistoryRecordSuccess(
  warehouseId,
  warehouseHistoryRecord,
) {
  return {
    type: ADD_WAREHOUSE_HISTORY_RECORD_SUCCESS,
    warehouseId,
    warehouseHistoryRecord,
  };
}

export function loadWarehouseHistory(warehouseId) {
  return {
    type: LOAD_WAREHOUSE_HISTORY,
    warehouseId,
  };
}

export function loadWarehouseHistorySuccess(warehouseId, warehouseHistory) {
  return {
    type: LOAD_WAREHOUSE_HISTORY_SUCCESS,
    history: warehouseHistory,
    warehouseId,
  };
}
