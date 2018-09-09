import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import FormTextField from '../../components/FormTextField';

import SubmitButton from '../../components/FormSubmitButton';

const validate = values => {
  const errors = {};
  const requiredFields = ['userName', 'password'];
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = 'Обязательное поле';
    }
  });
  if (values.get('password') && values.get('password').length <= 6) {
    errors.password = 'Длина пароля должна быть не менее 6 символов';
  }
  return errors;
};

const LoginForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <FormTextField
        name="username"
        label={<FormattedMessage {...messages.userName} />}
      />
    </div>
    <div>
      <FormTextField
        name="password"
        label={<FormattedMessage {...messages.password} />}
        type="password"
      />
    </div>
    <div>
      <SubmitButton label={<FormattedMessage {...messages.signIn} />} />
    </div>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);
