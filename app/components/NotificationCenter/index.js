/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Notifications from 'react-notification-system-redux';

import { makeSelectNotifications } from './selectors';

class NotificationsCenter extends React.Component {
  render() {
    return <Notifications notifications={this.props.notifications} />;
  }
}

NotificationsCenter.propTypes = {
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notifications: makeSelectNotifications(),
});

export default connect(mapStateToProps)(NotificationsCenter);
