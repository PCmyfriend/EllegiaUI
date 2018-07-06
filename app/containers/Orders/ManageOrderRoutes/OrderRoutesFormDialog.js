import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

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

const OrderRoutesFormDialog = ({ order, handleSubmit, handleCancelClick, isVisible }) => (
  <Dialog
    modal
    open={isVisible}
  >
    <h2><FormattedMessage {...messages.header} /></h2>
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
        <FlatButton type="submit" label={<FormattedMessage {...messages.send} />} primary />
        <FlatButton onClick={handleCancelClick} label={<FormattedMessage {...messages.cancel} />} secondary />
      </div>
    </form>
  </Dialog>
);

OrderRoutesFormDialog.propTypes = {
  order: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default reduxForm({
  validate,
})(OrderRoutesFormDialog);
