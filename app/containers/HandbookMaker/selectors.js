import { createSelector } from 'reselect';

const selectHandbookValues = (state, ownProps) => state.get(ownProps.handbookName);

const makeSelectHandbookValues = () => createSelector(
  selectHandbookValues,
  (handbookValuesState) => handbookValuesState,
);

export {
  selectHandbookValues,
  makeSelectHandbookValues,
};
