import { LOGIN_USER, LOGIN_USER_SUCCESS, SIGN_OUT_USER } from './constants';

export function loginUser(credentials) {
  return {
    type: LOGIN_USER,
    credentials,
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}

export function loginUserSuccess(authPayload) {
  return {
    type: LOGIN_USER_SUCCESS,
    authPayload,
  };
}
