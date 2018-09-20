import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import FormSelectField from '../../../components/FormSelectField';
import TextField from '../../../components/FormTextField';

import ManageFormDialogPage from '../../../components/FormDialog';
import InfoButton from '../../../components/Buttons/InfoButton';

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
      <InfoButton
        variant="text"
        label={<FormattedMessage {...messages.send} />}
      />
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
};

export default OrderRoutesFormDialog;
