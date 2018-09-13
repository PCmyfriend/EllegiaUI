import { fromJS } from 'immutable';

import { LOGIN_USER_SUCCESS, LOGIN_USER, SIGN_OUT_USER } from './constants';

const initialState = fromJS({
  credentials: null,
  authPayload: null,
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return state.set('credentials', Object.assign({}, action.credentials));
    case LOGIN_USER_SUCCESS:
      return state.set('authPayload', Object.assign({}, action.authPayload));
    case SIGN_OUT_USER:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;
