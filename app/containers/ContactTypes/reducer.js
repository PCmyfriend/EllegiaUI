import { fromJS } from 'immutable';

import { LOAD_CONTACT_TYPES_SUCCESS } from './constants';

const initialState = fromJS([]);

export default function contactTypesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONTACT_TYPES_SUCCESS:
      return fromJS(action.contactTypes);
    default:
      return state;
  }
}
