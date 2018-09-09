import { createSelector } from 'reselect';

const selectPlasticBagTypes = state => state.get('plasticBagTypes');

const makeSelectPlasticBagTypes = () =>
  createSelector(
    selectPlasticBagTypes,
    plasticBagTypesState => plasticBagTypesState,
  );

export { selectPlasticBagTypes, makeSelectPlasticBagTypes };
