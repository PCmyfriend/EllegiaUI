import { createSelector } from 'reselect';

const selectNotifications = state => state.get('notifications');

const makeSelectNotifications = () =>
  createSelector(selectNotifications, notificationsState => notificationsState);

export { selectNotifications, makeSelectNotifications };
