import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import { sendOrder } from '../actions';

import OrderRoutesFormDialog from './OrderRoutesFormDialog';
import messages from './messages';
import InfoButton from '../../../components/Buttons/InfoButton';

class ManageOrderRoutePage extends React.PureComponent {
  constructor(context, props) {
    super(context, props);

    this.state = {
      showOrderFormDialog: false,
    };

    this.handleOrderRoutesFormCancelClick = this.handleOrderRoutesFormCancelClick.bind(
      this,
    );
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleSendOrderClick = this.handleSendOrderClick.bind(this);
  }

  onSubmitForm(values) {
    this.setState({ showOrderFormDialog: false });

    this.props.sendOrder(values);
  }

  handleOrderRoutesFormCancelClick() {
    this.setState({ showOrderFormDialog: false });
  }

  handleSendOrderClick() {
    this.setState({ showOrderFormDialog: true });
  }

  render() {
    return (
      <div>
        <InfoButton
          variant="text"
          label={<FormattedMessage {...messages.send} />}
          onClick={this.handleSendOrderClick}
        />
        <OrderRoutesFormDialog
          form={`orderRoutesForm_${this.props.order.get('id')}`}
          order={this.props.order}
          onSubmit={this.onSubmitForm}
          handleCancelClick={this.handleOrderRoutesFormCancelClick}
          isVisible={this.state.showOrderFormDialog}
        />
      </div>
    );
  }
}

ManageOrderRoutePage.propTypes = {
  order: PropTypes.object.isRequired,
  sendOrder: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    sendOrder: values => dispatch(sendOrder(ownProps.order.get('id'), values)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(ManageOrderRoutePage);
