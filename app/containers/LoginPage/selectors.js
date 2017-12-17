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

export {
  selectUser,
  makeSelectCredentials,
  makeSelectUserRole,
};
