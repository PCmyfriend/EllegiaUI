import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import FormTextField from '../../../components/FormTextField';
import FormSelectField from '../../../components/FormSelectField';
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

const ContactForm = ({ contactTypes, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <FormSelectField
        name="contactTypeId"
        label={<FormattedMessage {...messages.contactType} />}
      >
        {contactTypes.map(ct => (
          <MenuItem
            key={ct.get('id')}
            value={ct.get('id')}
            primaryText={ct.get('name')}
          />
        ))}
      </FormSelectField>
    </div>
    <div>
      <FormTextField
        name="name"
        label={<FormattedMessage {...messages.contact} />}
      />
    </div>
    <div>
      <SubmitButton label={<FormattedMessage {...messages.save} />} />
    </div>
  </form>
);

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  contactTypes: PropTypes.object.isRequired,
};

export default reduxForm({
  validate,
})(ContactForm);
