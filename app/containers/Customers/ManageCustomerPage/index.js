import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import injectSaga from '../../../utils/injectSaga';
import { addCustomer } from '../actions';
import saga from './saga';

import messages from './messages';
import CustomerForm from './CustomerForm';

class ManageCustomerPage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <CustomerForm onSubmit={this.props.onSubmitForm} />
      </div>
    );
  }
}

ManageCustomerPage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => {
      const customer = {};
      Array.from(values.entries()).forEach((e) => {
        customer[e[0]] = e[1];
      });
      customer.id = 0;
      dispatch(addCustomer(customer));
    },
  };
}


const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'manageCustomer', saga });

export default compose(
  withSaga,
  withConnect
)(ManageCustomerPage);
