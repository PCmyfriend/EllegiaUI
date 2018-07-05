import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { sendOrder } from '../actions';

import OrderRoutesForm from './OrderRoutesForm';

class ManageOrderRoutePage extends React.PureComponent {

  render() {
    return (
      <div>
        <OrderRoutesForm
          form={`orderRoutesForm_${this.props.order.get('id')}`}
          order={this.props.order}
          onSubmit={this.props.onSubmitForm}
        />
      </div>
    );
  }

}

ManageOrderRoutePage.propTypes = {
  order: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmitForm: (values) => dispatch(sendOrder(ownProps.order.get('id'), values)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect
)(ManageOrderRoutePage);
