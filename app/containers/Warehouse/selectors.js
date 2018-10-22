import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectWarehouse = state => state.get('warehouses').get(1) || fromJS({});

const makeSelectHistoryRecords = () =>
  createSelector(
    selectWarehouse,
    warehouse => warehouse.get('history') || fromJS([]),
  );

export { selectWarehouse, makeSelectHistoryRecords };
