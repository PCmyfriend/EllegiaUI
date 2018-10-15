import { fromJS } from 'immutable';

import {
  LOAD_WAREHOUSE_SUCCESS,
  PUT_WAREHOUSE_ITEM_SUCCESS,
  TAKE_WAREHOUSE_ITEM_SUCCESS,
} from './constants';

const initialState = fromJS([]);

export function warehousesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WAREHOUSE_SUCCESS: {
      const warehouses = state.toJS();
      warehouses[action.warehouseId] = action.warehouse;
      return fromJS([...warehouses]);
    }
    case PUT_WAREHOUSE_ITEM_SUCCESS: {
      const { warehouseStockingHistoryRecord } = action;
      const warehouses = state.toJS();
      const warehouse = warehouses[warehouseStockingHistoryRecord.warehouseId];
      warehouse.inOutHistory.insert(0, warehouseStockingHistoryRecord);
      return fromJS([...warehouses]);
    }
    case TAKE_WAREHOUSE_ITEM_SUCCESS: {
      const { warehouseDeliveryHistoryRecord } = action;
      const warehouses = state.toJS();
      const warehouse = warehouses[warehouseDeliveryHistoryRecord.warehouseId];
      warehouse.inOutHistory.insert(0, warehouseDeliveryHistoryRecord);
      return fromJS([...warehouses]);
    }
    default:
      return state;
  }
}
