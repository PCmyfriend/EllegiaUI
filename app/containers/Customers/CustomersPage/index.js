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

import { loadCustomers } from '../actions';
import { makeSelectCustomers } from '../selectors';
import messages from './messages';
import saga from './saga';

import CustomerList from './CustomersList';

class CustomersPage extends React.PureComponent {

  componentDidMount() {
    this.props.loadCustomers();
  }

  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <CustomerList customers={this.props.customers} />
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
};

const mapStateToProps = createStructuredSelector({
  customers: makeSelectCustomers(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadCustomers: () => dispatch(loadCustomers()),
    redirectToAddCustomerPage: () => dispatch(push('/customer')),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'customers', saga });

export default compose(
  withSaga,
  withConnect
)(CustomersPage);
