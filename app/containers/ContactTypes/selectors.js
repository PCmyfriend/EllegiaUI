import { createSelector } from 'reselect';

const selectContactTypes = (state) => state.get('contactTypes');

const makeSelectContactTypes = () => createSelector(
  selectContactTypes,
  (contactTypesState) => contactTypesState,
);

export {
  selectContactTypes,
  makeSelectContactTypes,
};
