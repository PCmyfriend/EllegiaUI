import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import saga from './saga';

import ContactForm from './ContactForm';
import injectSaga from '../../../utils/injectSaga';

import { addContact } from '../actions';

class ManageContactPage extends React.PureComponent {
  render() {
    return (
      <div>
        <ContactForm onSubmit={this.props.onSubmitForm} />
      </div>
    );
  }
}

ManageContactPage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  customerId: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmitForm: (values) => {
      const contact = Object.assign({}, values.toJS(), { id: 0, customerId: ownProps.customerId });
      dispatch(addContact(contact));
    },
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'manageContact', saga });

export default compose(
  withSaga,
  withConnect
)(ManageContactPage);
