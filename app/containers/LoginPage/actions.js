import { LOGIN_USER, LOGIN_USER_SUCCESS } from './constants';

export function loginUser(credentials) {
  return {
    type: LOGIN_USER,
    credentials,
  };
}

export function loginUserSuccess(authPayload) {
  return {
    type: LOGIN_USER_SUCCESS,
    authPayload,
  };
}
