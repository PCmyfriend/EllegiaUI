import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import messages from './messages';

import FormSelectField from '../../../components/FormSelectField';
import TextField from '../../../components/FormTextField';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'recipientId',
  ];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Обязательное поле';
    }
  });
  return errors;
};

const OrderRoutesForm = ({ order, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <FormSelectField
        name={'recipientId'}
        label={<FormattedMessage {...messages.recipient} />}
      >
        {order.get('permittedRoutes').map((pr) =>
          <MenuItem key={pr.get('userId')} value={pr.get('userId')} primaryText={pr.get('fullName')} />
        )}
      </FormSelectField>
    </div>
    <div>
      <TextField
        name={'comment'}
        label={<FormattedMessage {...messages.comment} />}
      />
    </div>
    <div>
      <RaisedButton type="submit" label={<FormattedMessage {...messages.send} />} primary />
    </div>
  </form>
);

OrderRoutesForm.propTypes = {
  order: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
})(OrderRoutesForm);
