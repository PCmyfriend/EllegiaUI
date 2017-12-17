import { call, put, select, takeLatest } from 'redux-saga/effects';
import qs from 'qs';

import { LOGIN_USER } from './constants';
import { loginUserSuccess } from './actions';

import { request } from '../../api/ellegiaRequest';
import IdTokenParser from '../../utils/idTokenParser';

import { makeSelectCredentials } from './selectors';

export function* loginUser() {
  const credentials = yield select(makeSelectCredentials());
  credentials.scope = 'openid email name profile roles';
  credentials.grant_type = 'password';
  const urlEncodedCredentials = qs.stringify(credentials);
  const requestUrl = 'connect/token';

  try {
    const authPayload = yield call(
      request().post,
      requestUrl,
      urlEncodedCredentials,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    authPayload.idTokenInfo = IdTokenParser.parse(authPayload.id_token);
    yield put(loginUserSuccess(authPayload));
  } catch (err) {
    // yield put(loginUserFailure(err));
  }
}

export default function* userData() {
  yield takeLatest(LOGIN_USER, loginUser);
}
