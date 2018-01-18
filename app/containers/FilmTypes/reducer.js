import { fromJS } from 'immutable';

import {
  LOAD_FILM_TYPES_SUCCESS,
  ADD_FILM_TYPE_SUCCESS,
  DELETE_FILM_TYPE_SUCCESS,
} from './constants';

const initialState = fromJS([]);

const getFilmTypesExcept = (filmTypes, exceptFilmTypeId) => {
  const tempFilmTypes = [...(filmTypes || [])];

  const result = [];

  for (let i = 0; i < tempFilmTypes.length; i += 1) {
    if (tempFilmTypes[i].id != exceptFilmTypeId) {
      tempFilmTypes[i].children = getFilmTypesExcept(tempFilmTypes[i].children, exceptFilmTypeId);
      result.push(tempFilmTypes[i]);
    }
  }

  return result;
};

export default function filmTypesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FILM_TYPES_SUCCESS:
      return fromJS(action.filmTypes);
    case ADD_FILM_TYPE_SUCCESS:
      return fromJS([...state, action.filmType]);
    case DELETE_FILM_TYPE_SUCCESS:
      return fromJS(getFilmTypesExcept(state.toJS(), action.filmTypeId));
    default:
      return state;
  }
}
