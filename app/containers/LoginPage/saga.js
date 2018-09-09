import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import qs from 'qs';

import { LOGIN_USER } from './constants';
import { loginUserSuccess } from './actions';
import { showLoading, hideLoading } from '../../components/Progress/actions';
import {
  showSuccess,
  showError,
} from '../../components/NotificationCenter/actions';

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
    yield put(showLoading());
    const authPayload = yield call(
      request().post,
      requestUrl,
      urlEncodedCredentials,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    authPayload.idTokenInfo = IdTokenParser.parse(authPayload.id_token);
    yield all([
      put(loginUserSuccess(authPayload)),
      put(hideLoading()),
      put(showSuccess()),
    ]);
  } catch (err) {
    yield all([put(hideLoading()), put(showError())]);
  }
}

export default function* userData() {
  yield takeLatest(LOGIN_USER, loginUser);
}
