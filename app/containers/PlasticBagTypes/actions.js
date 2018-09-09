import {
  LOAD_PLASTIC_BAG_TYPES,
  LOAD_PLASTIC_BAG_TYPES_SUCCESS,
  ADD_PLASTIC_BAG_TYPE,
  ADD_PLASTIC_BAG_TYPE_SUCCESS,
  DELETE_PLASTIC_BAG_TYPE,
  DELETE_PLASTIC_BAG_TYPE_SUCCESS,
  ADD_STANDARD_SIZE,
  ADD_STANDARD_SIZE_SUCCESS,
  DELETE_STANDARD_SIZE,
  DELETE_STANDARD_SIZE_SUCCESS,
} from './constants';

export function loadPlasticBagTypes() {
  return {
    type: LOAD_PLASTIC_BAG_TYPES,
  };
}

export function loadPlasticBagTypesSuccess(plasticBagTypes) {
  return {
    type: LOAD_PLASTIC_BAG_TYPES_SUCCESS,
    plasticBagTypes,
  };
}

export function addPlasticBagType(plasticBagType) {
  return {
    type: ADD_PLASTIC_BAG_TYPE,
    plasticBagType,
  };
}

export function addPlasticBagTypeSuccess(plasticBagType) {
  return {
    type: ADD_PLASTIC_BAG_TYPE_SUCCESS,
    plasticBagType,
  };
}

export function deletePlasticBagType(plasticBagTypeId) {
  return {
    type: DELETE_PLASTIC_BAG_TYPE,
    plasticBagTypeId,
  };
}

export function deletePlasticBagTypeSuccess(plasticBagTypeId) {
  return {
    type: DELETE_PLASTIC_BAG_TYPE_SUCCESS,
    plasticBagTypeId,
  };
}

export function addStandardSize(standardSize) {
  return {
    type: ADD_STANDARD_SIZE,
    standardSize,
  };
}

export function addStandardSizeSuccess(standardSize) {
  return {
    type: ADD_STANDARD_SIZE_SUCCESS,
    standardSize,
  };
}

export function deleteStandardSize(plasticBagTypeId, standardSizeId) {
  return {
    type: DELETE_STANDARD_SIZE,
    plasticBagTypeId,
    standardSizeId,
  };
}

export function deleteStandardSizeSuccess(standardSizeId) {
  return {
    type: DELETE_STANDARD_SIZE_SUCCESS,
    standardSizeId,
  };
}
