import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Assignment from '@material-ui/icons/Assignment';
import FlightTakeOff from '@material-ui/icons/FlightTakeoff';
import LocalAirportIcon from '@material-ui/icons/LocalAirport';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from '../../../utils/injectSaga';

import saga from '../saga';
import messages from './messages';
import { makeSelectOrdersByStatus } from '../selectors';
import { loadOrders, deleteOrder } from '../actions';
import {
  ON_EDITING,
  ACTIVE,
  ACTIVE_PARTIALLY_RELEASED,
  COMPLETED,
  RELEASED,
  CLOSED,
} from '../orderStatuses';

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
    this.props.loadOrders(ON_EDITING);
    this.props.loadOrders(ACTIVE);
    this.props.loadOrders(ACTIVE_PARTIALLY_RELEASED);
    this.props.loadOrders(RELEASED);
    this.props.loadOrders(CLOSED);
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
      return this.props.editingOrders;
    } else if (selectedTab === 1) {
      return this.props.activeOrders;
    } else if (selectedTab === 2) {
      return this.props.activePartiallyReleasedOrders;
    } else if (selectedTab === 3) {
      return this.props.completedOrders;
    } else if (selectedTab === 4) {
      return this.props.releaseOrders;
    }

    return this.props.closedOrders;
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
              icon={<EditIcon />}
              label={<FormattedMessage {...messages.onEditing} />}
            />
            <Tab
              icon={<Assignment />}
              label={<FormattedMessage {...messages.active} />}
            />
            <Tab
              icon={<FlightTakeOff />}
              label={<FormattedMessage {...messages.activePartiallyReleased} />}
            />
            <Tab
              icon={<DoneIcon />}
              label={<FormattedMessage {...messages.completed} />}
            />
            <Tab
              icon={<LocalAirportIcon />}
              label={<FormattedMessage {...messages.released} />}
            />
            <Tab
              icon={<CloseIcon />}
              label={<FormattedMessage {...messages.closed} />}
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
  editingOrders: PropTypes.object.isRequired,
  activeOrders: PropTypes.object.isRequired,
  activePartiallyReleasedOrders: PropTypes.object.isRequired,
  completedOrders: PropTypes.object.isRequired,
  releaseOrders: PropTypes.object.isRequired,
  closedOrders: PropTypes.object.isRequired,
  loadOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  authHeader: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editingOrders: makeSelectOrdersByStatus(ON_EDITING),
  activeOrders: makeSelectOrdersByStatus(ACTIVE),
  activePartiallyReleasedOrders: makeSelectOrdersByStatus(
    ACTIVE_PARTIALLY_RELEASED,
  ),
  completedOrders: makeSelectOrdersByStatus(COMPLETED),
  releaseOrders: makeSelectOrdersByStatus(RELEASED),
  closedOrders: makeSelectOrdersByStatus(CLOSED),
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
