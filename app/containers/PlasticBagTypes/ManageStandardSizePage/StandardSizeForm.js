import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import FormTextField from '../../../components/FormTextField';

const validate = values => {
  const errors = {};
  const requiredFields = ['widthInMm', 'lengthInMm', 'quantityInBag'];
  requiredFields.forEach(field => {
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
        name="widthInMm"
        label={<FormattedMessage {...messages.widthInMm} />}
      />
    </div>
    <div>
      <FormTextField
        name="lengthInMm"
        label={<FormattedMessage {...messages.lengthInMm} />}
      />
    </div>
    <div>
      <FormTextField
        name="heightInMm"
        label={<FormattedMessage {...messages.heightInMm} />}
      />
    </div>
    <div>
      <FormTextField
        name="quantityInBag"
        label={<FormattedMessage {...messages.quantityInBag} />}
      />
    </div>
    <div>
      <RaisedButton
        type="submit"
        label={<FormattedMessage {...messages.save} />}
        primary
      />
    </div>
  </form>
);

StandardSizeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
})(StandardSizeForm);
