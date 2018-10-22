import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Assignment from '@material-ui/icons/Assignment';
import FlightTakeOff from '@material-ui/icons/FlightTakeoff';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from '../../../utils/injectSaga';

import saga from '../saga';
import messages from './messages';
import { makeSelectOrdersByStatus } from '../selectors';
import { loadOrders, deleteOrder } from '../actions';
import { ACTIVE, COMPLETED, RELEASED } from '../orderStatuses';

import { openRemoteFile } from '../../../api/ellegiaRemoteFileOpener';
import { makeSelectToken } from '../../LoginPage/selectors';

import OrdersList from './OrdersList';

class OrdersPage extends React.PureComponent {
  constructor(context, props) {
    super(context, props);

    this.state = {
      selectedTab: 0,
    };

    this.handlePreviewOrderPrintingVersionClick = this.handlePreviewOrderPrintingVersionClick.bind(
      this,
    );
    this.handleDeleteOrderClick = this.handleDeleteOrderClick.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.getOrdersBySelectedTab = this.getOrdersBySelectedTab.bind(this);
  }

  componentDidMount() {
    this.props.loadOrders(ACTIVE);
    this.props.loadOrders(COMPLETED);
    this.props.loadOrders(RELEASED);
  }

  handlePreviewOrderPrintingVersionClick(orderId) {
    openRemoteFile(this.props.authHeader, `orders/${orderId}/printingVersion`);
  }

  handleDeleteOrderClick(orderId) {
    this.props.deleteOrder(orderId);
  }

  handleTabChange(event, value) {
    this.setState({ selectedTab: value });
  }

  getOrdersBySelectedTab() {
    const { selectedTab } = this.state;
    if (selectedTab === 0) {
      return this.props.activeOrders;
    } else if (selectedTab === 1) {
      return this.props.completedOrders;
    }
    return this.props.releaseOrders;
  }

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <Paper>
          <Tabs
            value={this.state.selectedTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab
              icon={<Assignment />}
              label={<FormattedMessage {...messages.active} />}
            />
            <Tab
              icon={<AssignmentTurnedIn />}
              label={<FormattedMessage {...messages.completed} />}
            />
            <Tab
              icon={<FlightTakeOff />}
              label={<FormattedMessage {...messages.released} />}
            />
          </Tabs>
          <OrdersList
            orders={this.getOrdersBySelectedTab()}
            handlePreviewOrderPrintingVersionClick={
              this.handlePreviewOrderPrintingVersionClick
            }
            handleDeleteOrderClick={this.handleDeleteOrderClick}
          />
        </Paper>
      </div>
    );
  }
}

OrdersPage.propTypes = {
  activeOrders: PropTypes.object.isRequired,
  completedOrders: PropTypes.object.isRequired,
  releaseOrders: PropTypes.object.isRequired,
  loadOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  authHeader: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activeOrders: makeSelectOrdersByStatus(ACTIVE),
  completedOrders: makeSelectOrdersByStatus(COMPLETED),
  releaseOrders: makeSelectOrdersByStatus(RELEASED),
  authHeader: makeSelectToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadOrders: orderStatus => dispatch(loadOrders(orderStatus)),
    deleteOrder: orderId => dispatch(deleteOrder(orderId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'orders', saga });

export default compose(
  withConnect,
  withSaga,
)(OrdersPage);
