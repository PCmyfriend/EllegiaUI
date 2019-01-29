import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';

import messages from './messages';

import FormSelectField from '../../../components/FormSelectField';
import TextField from '../../../components/FormTextField';

import ManageFormDialogPage from '../../../components/FormDialog';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const validate = values => {
  const errors = {};
  const requiredFields = ['recipientId', 'comment'];
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = 'Обязательное поле';
    }
  });
  return errors;
};

const OrderRoutesFormDialog = ({ order, handleSubmit }) => (
  <ManageFormDialogPage
    title={<FormattedMessage {...messages.header} />}
    cancelButtonTitle={<FormattedMessage {...messages.cancel} />}
    submitButtonTitle={<FormattedMessage {...messages.send} />}
    onSubmitForm={handleSubmit}
    openingButton={
      <IconButton>
        <SendIcon />
      </IconButton>
    }
    validate={validate}
  >
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
  </ManageFormDialogPage>
);

OrderRoutesFormDialog.propTypes = {
  order: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderRoutesFormDialog);
