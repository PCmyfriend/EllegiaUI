import {
  LOAD_HANDBOOK_VALUES,
  LOAD_HANDBOOK_VALUES_SUCCESS,
  ADD_HANDBOOK_VALUE,
  ADD_HANDBOOK_VALUE_SUCCESS,
  DELETE_HANDBOOK_VALUE,
  DELETE_HANDBOOK_VALUE_SUCCESS,
} from './constants';

export function loadHandbookValues(handbookName) {
  return {
    name: handbookName,
    type: LOAD_HANDBOOK_VALUES,
  };
}

export function loadHandbookValuesSuccess(handbookName, values) {
  return {
    name: handbookName,
    type: LOAD_HANDBOOK_VALUES_SUCCESS,
    values,
  };
}

export function addHandbookValue(handbookName, value) {
  return {
    name: handbookName,
    type: ADD_HANDBOOK_VALUE,
    value,
  };
}

export function addHandbookValueSuccess(handbookName, value) {
  return {
    name: handbookName,
    type: ADD_HANDBOOK_VALUE_SUCCESS,
    value,
  };
}

export function deleteHandbookValue(handbookName, valueId) {
  return {
    name: handbookName,
    type: DELETE_HANDBOOK_VALUE,
    valueId,
  };
}

export function deleteHandbookValueSuccess(handbookName, valueId) {
  return {
    name: handbookName,
    type: DELETE_HANDBOOK_VALUE_SUCCESS,
    valueId,
  };
}
