import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import messages from './messages';

import FormSelectField from '../../../components/FormSelectField';
import TextField from '../../../components/FormTextField';
import SubmitButton from '../../../components/FormSubmitButton';
import CancelButton from '../../../components/Buttons/CancelButton';

const validate = values => {
  const errors = {};
  const requiredFields = ['recipientId'];
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = 'Обязательное поле';
    }
  });
  return errors;
};

const OrderRoutesFormDialog = ({
  order,
  handleSubmit,
  handleCancelClick,
  isVisible,
}) => (
  <Dialog
    onClose={handleCancelClick}
    open={isVisible}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">
      <FormattedMessage {...messages.header} />
    </DialogTitle>
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <FormSelectField
          name="recipientId"
          label={<FormattedMessage {...messages.recipient} />}
          data={order.permittedRoutes.map(pr => ({
            id: pr.userId,
            name: pr.fullName,
          }))}
        />
        <TextField
          fullWidth
          name="comment"
          label={<FormattedMessage {...messages.comment} />}
        />
      </DialogContent>
      <DialogActions>
        <CancelButton
          onClick={handleCancelClick}
          label={<FormattedMessage {...messages.cancel} />}
          variant="outlined"
        />
        <SubmitButton
          label={<FormattedMessage {...messages.send} />}
          variant="outlined"
        />
      </DialogActions>
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
