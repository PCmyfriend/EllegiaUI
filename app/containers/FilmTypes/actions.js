import {
  ADD_FILM_TYPE,
  ADD_FILM_TYPE_SUCCESS,
  DELETE_FILM_TYPE,
  DELETE_FILM_TYPE_SUCCESS,
  LOAD_FILM_TYPES,
  LOAD_FILM_TYPES_SUCCESS,
} from './constants';

export function loadFilmTypes() {
  return {
    type: LOAD_FILM_TYPES,
  };
}

export function loadFilmTypesSuccess(filmTypes) {
  return {
    type: LOAD_FILM_TYPES_SUCCESS,
    filmTypes,
  };
}

export function addFilmType(filmType) {
  return {
    type: ADD_FILM_TYPE,
    filmType,
  };
}

export function addFilmTypeSuccess(filmType) {
  return {
    type: ADD_FILM_TYPE_SUCCESS,
    filmType,
  };
}

export function deleteFilmType(filmTypeId) {
  return {
    type: DELETE_FILM_TYPE,
    filmTypeId,
  };
}

export function deleteFilmTypeSuccess(filmTypeId) {
  return {
    type: DELETE_FILM_TYPE_SUCCESS,
    filmTypeId,
  };
}
