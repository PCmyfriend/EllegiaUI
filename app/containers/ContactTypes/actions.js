import { LOAD_CONTACT_TYPES, LOAD_CONTACT_TYPES_SUCCESS } from './constants';

export function loadContactTypes() {
  return {
    type: LOAD_CONTACT_TYPES,
  };
}

export function loadContactTypesSuccess(contactTypes) {
  return {
    type: LOAD_CONTACT_TYPES_SUCCESS,
    contactTypes,
  };
}
