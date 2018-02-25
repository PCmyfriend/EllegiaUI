import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Tabs, Tab } from 'material-ui/Tabs';
import AssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import Assignment from 'material-ui/svg-icons/action/assignment';
import FlightTakeOff from 'material-ui/svg-icons/action/flight-takeoff';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from '../../../utils/injectSaga';

import saga from '../saga';
import messages from './messages';
import { makeSelectOrdersByStatus } from '../selectors';
import { loadOrders } from '../actions';
import { ACTIVE, COMPLETED, RELEASED } from '../orderStatuses';

import OrdersList from './OrdersList';

class OrdersPage extends React.PureComponent {

  componentDidMount() {
    this.props.loadOrders(ACTIVE);
    this.props.loadOrders(COMPLETED);
    this.props.loadOrders(RELEASED);
  }

  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <Tabs>
          <Tab
            icon={<Assignment />}
            label={<FormattedMessage {...messages.active} />}
          >
            <OrdersList orders={this.props.activeOrders} />
          </Tab>
          <Tab
            icon={<AssignmentTurnedIn />}
            label={<FormattedMessage {...messages.completed} />}
          >
            <OrdersList orders={this.props.completedOrders} />
          </Tab>
          <Tab
            icon={<FlightTakeOff />}
            label={<FormattedMessage {...messages.released} />}
          >
            <OrdersList orders={this.props.releaseOrders} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

OrdersPage.propTypes = {
  activeOrders: PropTypes.object.isRequired,
  completedOrders: PropTypes.object.isRequired,
  releaseOrders: PropTypes.object.isRequired,
  loadOrders: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activeOrders: makeSelectOrdersByStatus(ACTIVE),
  completedOrders: makeSelectOrdersByStatus(COMPLETED),
  releaseOrders: makeSelectOrdersByStatus(RELEASED),
});

function mapDispatchToProps(dispatch) {
  return {
    loadOrders: (orderStatus) => dispatch(loadOrders(orderStatus)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'orders', saga });

export default compose(
  withConnect,
  withSaga,
)(OrdersPage);
