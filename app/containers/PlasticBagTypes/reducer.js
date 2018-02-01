import { fromJS } from 'immutable';

import {
  LOAD_PLASTIC_BAG_TYPES_SUCCESS,
  ADD_PLASTIC_BAG_TYPE_SUCCESS,
  DELETE_PLASTIC_BAG_TYPE_SUCCESS,
  ADD_STANDARD_SIZE_SUCCESS,
  DELETE_STANDARD_SIZE_SUCCESS,
} from './constants';

const initialState = fromJS([]);

const getPlasticBagTypeById = (plasticBagTypes, plasticBagTypeId) => {
  for (let i = 0; i < plasticBagTypes.length; i += 1) {
    if (plasticBagTypes[i].id === plasticBagTypeId) {
      return plasticBagTypes[i];
    }
  }
  return undefined;
};

export default function plasticBagTypesReducer(state = initialState, action) {
  let plasticBagTypes = null;
  let plasticBagType = null;
  switch (action.type) {
    case LOAD_PLASTIC_BAG_TYPES_SUCCESS:
      return fromJS([...action.plasticBagTypes]);
    case ADD_PLASTIC_BAG_TYPE_SUCCESS:
      return fromJS([...state, action.plasticBagType]);
    case DELETE_PLASTIC_BAG_TYPE_SUCCESS:
      return fromJS([...state.filter((pbt) => pbt.get('id') == action.plasticBagTypeId)]);
    case ADD_STANDARD_SIZE_SUCCESS: {
      plasticBagTypes = state.toJS();
      const standardSize = action.standardSize;
      plasticBagType = getPlasticBagTypeById(plasticBagTypes, standardSize.plasticBagTypeId);
      plasticBagType.standardSizes.push(standardSize);
      return fromJS([...plasticBagTypes]);
    }
    case DELETE_STANDARD_SIZE_SUCCESS: {
      plasticBagTypes = state.toJS();
      for (let i = 0; i < plasticBagTypes.length; i += 1) {
        plasticBagType = plasticBagTypes[i];
        const standardSizes = [];
        for (let j = 0; j < plasticBagType.standardSizes.length; j += 1) {
          if (plasticBagType.standardSizes[j].id !== action.standardSizeId) {
            standardSizes.push(plasticBagType.standardSizes[j]);
          }
        }
        plasticBagType.standardSizes = standardSizes;
      }
      return fromJS([...plasticBagTypes]);
    }
    default:
      return state;
  }
}
