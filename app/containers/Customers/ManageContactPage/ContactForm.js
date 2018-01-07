import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import FormTextField from '../../../components/FormTextField';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
  ];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Обязательное поле';
    }
  });
  return errors;
};

const ContactForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <FormTextField
        name="name"
        label={<FormattedMessage {...messages.contact} />}
      />
    </div>
    <div>
      <FormTextField
        name="contactTypeId"
        label={<FormattedMessage {...messages.contactType} />}
      />
    </div>
    <div>
      <RaisedButton type="submit" label={<FormattedMessage {...messages.save} />} primary />
    </div>
  </form>
);

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'contactForm',
  validate,
})(ContactForm);
