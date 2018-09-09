import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import FormTextField from '../../../components/FormTextField';
import messages from './messages';
import SubmitButton from '../../../components/FormSubmitButton';

const validate = values => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = 'Обязательное поле';
    }
  });
  return errors;
};

const CustomerForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <FormTextField
        name="name"
        label={<FormattedMessage {...messages.customerName} />}
      />
    </div>
    <div>
      <SubmitButton label={<FormattedMessage {...messages.save} />} />
    </div>
  </form>
);

CustomerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'customerForm',
  validate,
})(CustomerForm);
