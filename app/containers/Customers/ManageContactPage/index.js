import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import contactTypesSaga from '../../ContactTypes/saga';

import ContactForm from './ContactForm';
import injectSaga from '../../../utils/injectSaga';

import { addContact } from '../actions';
import { loadContactTypes } from '../../ContactTypes/actions';

import { makeSelectContactTypes } from '../../ContactTypes/selectors';

class ManageContactPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadContactTypes();
  }

  render() {
    return (
      <div>
        <ContactForm
          form={`contactsForm_${this.props.customerId}`}
          contactTypes={this.props.contactTypes}
          onSubmit={this.props.onSubmitForm}
        />
      </div>
    );
  }
}

ManageContactPage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  loadContactTypes: PropTypes.func.isRequired,
  customerId: PropTypes.number.isRequired,
  contactTypes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contactTypes: makeSelectContactTypes(),
});

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmitForm: values => {
      const contact = Object.assign({}, values.toJS(), {
        id: 0,
        customerId: ownProps.customerId,
      });
      dispatch(addContact(contact));
    },
    loadContactTypes: () => dispatch(loadContactTypes()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withContactTypesSaga = injectSaga({
  key: 'contactTypes',
  saga: contactTypesSaga,
});

export default compose(
  withContactTypesSaga,
  withConnect,
)(ManageContactPage);
