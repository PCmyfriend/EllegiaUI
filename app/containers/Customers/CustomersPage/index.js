import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { push } from 'react-router-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import injectSaga from '../../../utils/injectSaga';

import { loadCustomers, deleteCustomer, deleteContact } from '../actions';
import { makeSelectCustomers } from '../selectors';
import messages from './messages';
import saga from './saga';
import manageCustomerSaga from '../ManageCustomerPage/saga';

import CustomerList from './CustomersList';

class CustomersPage extends React.PureComponent {

  constructor(context, state) {
    super(context, state);

    this.state = {
      expandedCustomers: {},
    };

    this.handleCustomerClick = this.handleCustomerClick.bind(this);
  }

  componentDidMount() {
    this.props.loadCustomers();
  }

  handleCustomerClick(event) {
    const customerId = event.currentTarget.id;
    const expandedCustomers = this.state.expandedCustomers;
    expandedCustomers[customerId] = !expandedCustomers[customerId];
    this.setState({ expandedCustomers: Object.assign({}, expandedCustomers) });
  }

  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <CustomerList
          customers={this.props.customers}
          onCustomerClick={this.handleCustomerClick}
          onDeleteCustomerClick={this.props.handleDeleteCustomerClick}
          onDeleteContactClick={this.props.handleDeleteContactClick}
          expendedCustomers={this.state.expandedCustomers}
        />
        <FloatingActionButton onClick={this.props.redirectToAddCustomerPage}>
          <ContentAdd />
        </FloatingActionButton >
      </div>
    );
  }
}

CustomersPage.propTypes = {
  customers: PropTypes.object.isRequired,
  loadCustomers: PropTypes.func.isRequired,
  redirectToAddCustomerPage: PropTypes.func.isRequired,
  handleDeleteCustomerClick: PropTypes.func.isRequired,
  handleDeleteContactClick: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  customers: makeSelectCustomers(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadCustomers: () => dispatch(loadCustomers()),
    redirectToAddCustomerPage: () => dispatch(push('/customer')),
    handleDeleteCustomerClick: (event) => dispatch(deleteCustomer(event.currentTarget.id)),
    handleDeleteContactClick: (event) => dispatch(deleteContact(event.currentTarget.id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'customers', saga });
const withManageCustomerSaga = injectSaga({ key: 'manageCustomer', saga: manageCustomerSaga });

export default compose(
  withSaga,
  withManageCustomerSaga,
  withConnect
)(CustomersPage);
