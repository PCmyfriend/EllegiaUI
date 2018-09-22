import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { sendOrder } from '../actions';

import OrderRoutesFormDialog from './OrderRoutesFormDialog';

class ManageOrderRoutePage extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(values) {
    this.props.sendOrder(values);
  }

  render() {
    return (
      <OrderRoutesFormDialog
        order={this.props.order}
        handleSubmit={this.onSubmitForm}
      />
    );
  }
}

ManageOrderRoutePage.propTypes = {
  order: PropTypes.object.isRequired,
  sendOrder: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    sendOrder: values => dispatch(sendOrder(ownProps.order.id, values)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(ManageOrderRoutePage);
