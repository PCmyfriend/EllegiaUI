import { fromJS } from 'immutable';

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER,
} from './constants';

const initialState = fromJS({
  credentials: false,
  authPayload: false,
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return state
        .set('credentials', Object.assign({}, action.credentials));
    case LOGIN_USER_SUCCESS:
      return state
        .set('authPayload', Object.assign({}, action.authPayload));
    default:
      return state;
  }
}

export default userReducer;
