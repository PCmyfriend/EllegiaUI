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
    'heightInCm',
    'widthInCm',
    'quantityInBag',
  ];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Обязательное поле';
    }
  });
  return errors;
};

const StandardSizeForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <FormTextField
        name="heightInCm"
        label={<FormattedMessage {...messages.height} />}
      />
    </div>
    <div>
      <FormTextField
        name="widthInCm"
        label={<FormattedMessage {...messages.width} />}
      />
    </div>
    <div>
      <FormTextField
        name="quantityInBag"
        label={<FormattedMessage {...messages.quantityInBag} />}
      />
    </div>
    <div>
      <RaisedButton type="submit" label={<FormattedMessage {...messages.save} />} primary />
    </div>
  </form>
);

StandardSizeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'standardSizeForm',
  validate,
})(StandardSizeForm);
