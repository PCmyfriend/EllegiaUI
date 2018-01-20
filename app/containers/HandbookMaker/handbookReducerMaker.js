import { fromJS } from 'immutable';

import {
  LOAD_HANDBOOK_VALUES_SUCCESS,
  ADD_HANDBOOK_VALUE_SUCCESS,
  DELETE_HANDBOOK_VALUE_SUCCESS,
} from './constants';

const intialState = fromJS([]);

export default function createHandbookReducer(handbookName) {
  return (state = intialState, action) => {
    const { name } = action;
    if (name !== handbookName) return state;

    switch (action.type) {
      case LOAD_HANDBOOK_VALUES_SUCCESS:
        return fromJS([...action.values]);
      case ADD_HANDBOOK_VALUE_SUCCESS:
        return fromJS([...state, action.value]);
      case DELETE_HANDBOOK_VALUE_SUCCESS:
        return fromJS([...state.toJS().filter((value) => value.id != action.valueId)]);
      default:
        return state;
    }
  };
}
