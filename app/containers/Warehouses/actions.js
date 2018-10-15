import {
  PUT_WAREHOUSE_ITEM,
  PUT_WAREHOUSE_ITEM_SUCCESS,
  TAKE_WAREHOUSE_ITEM,
  TAKE_WAREHOUSE_ITEM_SUCCESS,
  LOAD_WAREHOUSE,
  LOAD_WAREHOUSE_SUCCESS,
} from './constants';

export function putWarehouseItem(warehouseId, warehouseItem) {
  return {
    type: PUT_WAREHOUSE_ITEM,
    warehouseItem,
    warehouseId,
  };
}

export function takeWarehouseItem(warehouseId, warehouseItem) {
  return {
    type: TAKE_WAREHOUSE_ITEM,
    warehouseItem,
    warehouseId,
  };
}

export function takeWarehouseItemSuccess(warehouseDeliveryHistoryRecord) {
  return {
    type: TAKE_WAREHOUSE_ITEM_SUCCESS,
    warehouseDeliveryHistoryRecord,
  };
}

export function putWarehouseItemSuccess(warehouseStockingHistoryRecord) {
  return {
    type: PUT_WAREHOUSE_ITEM_SUCCESS,
    warehouseStockingHistoryRecord,
  };
}

export function loadWarehouse() {
  return {
    type: LOAD_WAREHOUSE,
  };
}

export function loadWarehouseSuccess(warehouse) {
  return {
    type: LOAD_WAREHOUSE_SUCCESS,
    warehouse,
  };
}
