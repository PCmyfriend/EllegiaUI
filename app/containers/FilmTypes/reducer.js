import { fromJS } from 'immutable';

import {
  LOAD_FILM_TYPES_SUCCESS,
} from './constants';

const initialState = fromJS([]);

export default function filmTypesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FILM_TYPES_SUCCESS:
      return fromJS(action.filmTypes);
    default:
      return state;
  }
}
