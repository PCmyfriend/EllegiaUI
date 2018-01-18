import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';

import FormTextField from '../../../components/FormTextField';
import FormSelectField from '../../../components/FormSelectField';
import messages from './messages';

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

const FilmTypeForm = ({ handleSubmit, filmTypes }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <FormSelectField
        name="parentId"
        label={<FormattedMessage {...messages.parentFilmType} />}
      >
        {filmTypes.map((ft) =>
          <MenuItem key={ft.get('id')} value={ft.get('id')} primaryText={ft.get('name')} />
        )}
      </FormSelectField>
    </div>
    <div>
      <FormTextField
        name="name"
        label={<FormattedMessage {...messages.filmType} />}
      />
    </div>
    <div>
      <RaisedButton type="submit" label={<FormattedMessage {...messages.save} />} primary />
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
