import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectWarehouse = state =>
  fromJS(state.get('warehouses').toJS()[1] || {});

const makeSelectHistoryRecords = () =>
  createSelector(
    selectWarehouse,
    warehouse => warehouse.get('history') || fromJS([]),
  );

export { selectWarehouse, makeSelectHistoryRecords };
