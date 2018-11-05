import { fromJS } from 'immutable';

import {
  LOAD_WAREHOUSE_HISTORY_SUCCESS,
  ADD_WAREHOUSE_HISTORY_RECORD_SUCCESS,
} from './constants';

const initialState = fromJS({});

export default function warehousesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WAREHOUSE_HISTORY_SUCCESS: {
      const warehouses = state.toJS();
      warehouses[action.warehouseId] = { history: action.history };
      return fromJS(Object.assign({}, warehouses));
    }
    case ADD_WAREHOUSE_HISTORY_RECORD_SUCCESS: {
      const { warehouseId, warehouseHistoryRecord } = action;
      const warehouses = state.toJS();
      const warehouse = warehouses[warehouseId];
      warehouse.history.splice(0, 0, warehouseHistoryRecord);
      return fromJS(Object.assign({}, warehouses));
    }
    default:
      return state;
  }
}
