import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import FormTextField from '../../../components/FormTextField';
import FormSelectField from '../../../components/FormSelectField';
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

const FilmTypeForm = ({ handleSubmit, filmTypes }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <FormSelectField
        name="parentId"
        label={<FormattedMessage {...messages.parentFilmType} />}
        data={filmTypes.toJS()}
      />
    </div>
    <div>
      <FormTextField
        name="name"
        label={<FormattedMessage {...messages.filmType} />}
      />
    </div>
    <div>
      <SubmitButton label={<FormattedMessage {...messages.save} />} />
    </div>
  </form>
);

FilmTypeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  filmTypes: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'filmTypeForm',
  validate,
})(FilmTypeForm);
