import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import FormTextField from '../../../components/FormTextField';
import SubmitButton from '../../../components/FormSubmitButton';
import messages from './messages';

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

const HandbookValueForm = ({ handleSubmit, handbookSingularName }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <FormTextField
        name="name"
        label={<FormattedMessage {...messages[handbookSingularName]} />}
      />
    </div>
    <div>
      <SubmitButton label={<FormattedMessage {...messages.save} />} />
    </div>
  </form>
);

HandbookValueForm.propTypes = {
  handbookSingularName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'handbookValue',
  validate,
})(HandbookValueForm);
