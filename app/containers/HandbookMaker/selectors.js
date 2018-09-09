import { createSelector } from 'reselect';

const selectHandbookValues = handbookName => state => state.get(handbookName);

const makeSelectHandbookValues = handbookName =>
  createSelector(
    selectHandbookValues(handbookName),
    handbookValuesState => handbookValuesState,
  );

export { selectHandbookValues, makeSelectHandbookValues };
