import {
  LOAD_FILM_TYPES,
  LOAD_FILM_TYPES_SUCCESS,
} from './constants';

export function loadFilmTypes() {
  return {
    type: LOAD_FILM_TYPES,
  }
}

export function loadFilmTypesSuccess(filmTypes) {
  return {
    type: LOAD_FILM_TYPES_SUCCESS,
    filmTypes,
  }
}
