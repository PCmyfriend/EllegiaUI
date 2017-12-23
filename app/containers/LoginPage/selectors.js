import { createSelector } from 'reselect';

const selectUser = (state) => state.get('user');

const makeSelectCredentials = () => createSelector(
  selectUser,
  (userState) => userState.get('credentials')
);

const makeSelectUserRole = () => createSelector(
  selectUser,
  (userState) => {
    if (!userState) {
      return null;
    }
    const authPayload = userState.get('authPayload');
    return authPayload ? authPayload.idTokenInfo.role : null;
  }
);

const makeSelectToken = () => createSelector(
  selectUser,
  (userState) => {
    if (!userState) {
      return null;
    }
    const authPayload = userState.get('authPayload');
    return authPayload ? `${authPayload.token_type} ${authPayload.access_token}` : null;
  }
);

export {
  selectUser,
  makeSelectCredentials,
  makeSelectUserRole,
  makeSelectToken,
};
