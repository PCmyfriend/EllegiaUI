import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton/IconButton';
import AddContactIcon from '@material-ui/icons/ContactMail';

import messages from './messages';

import FormTextField from '../../../components/FormTextField';
import FormSelectField from '../../../components/FormSelectField';
import ManageFormDialogPage from '../../../components/FormDialog';

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

const ContactForm = ({ contactTypes, handleSubmit }) => (
  <ManageFormDialogPage
    title={<FormattedMessage {...messages.header} />}
    onSubmitForm={handleSubmit}
    cancelButtonTitle={<FormattedMessage {...messages.cancel} />}
    submitButtonTitle={<FormattedMessage {...messages.save} />}
    openingButton={
      <IconButton>
        <AddContactIcon />
      </IconButton>
    }
    validate={validate}
  >
    <div>
      <FormSelectField
        name="contactTypeId"
        label={
          <FormattedMessage
            {...messages.contactType}
            data={contactTypes.toJS()}
          />
        }
        data={contactTypes.toJS()}
      />
    </div>
    <div>
      <FormTextField
        name="name"
        label={<FormattedMessage {...messages.contact} />}
      />
    </div>
  </ManageFormDialogPage>
);

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  contactTypes: PropTypes.object.isRequired,
};

export default ContactForm;
