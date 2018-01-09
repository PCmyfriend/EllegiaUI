import { createSelector } from 'reselect';

const selectFilmTypes = (state) => state.get('filmTypes');

const makeSelectFilmTypes = () => createSelector(
  selectFilmTypes,
  (filmTypesState) => filmTypesState,
);

export {
  selectFilmTypes,
  makeSelectFilmTypes,
}
