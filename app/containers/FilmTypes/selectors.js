import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectFilmTypes = (state) => state.get('filmTypes');

const makeSelectFilmTypes = () => createSelector(
  selectFilmTypes,
  (filmTypesState) => filmTypesState,
);

const getFilmTypes = (recursiveFilmTypes) => {
  let result = [];

  if (!recursiveFilmTypes) { return result; }

  recursiveFilmTypes.forEach((ft) => {
    result.push(ft);
    result = [...result, ...getFilmTypes(ft.get('children'))];
  });

  return result;
};

const makeSelectNotRecursiveFilmTypes = () => createSelector(
  selectFilmTypes,
  (filmTypesState) => fromJS([...getFilmTypes(filmTypesState)])
);

export {
  selectFilmTypes,
  makeSelectFilmTypes,
  makeSelectNotRecursiveFilmTypes,
};
