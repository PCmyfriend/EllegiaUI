import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton/IconButton';
import AddStandardSizeIcon from '@material-ui/icons/Add';

import messages from './messages';

import FormTextField from '../../../components/FormTextField';

import FormDialog from '../../../components/FormDialog';

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
  <FormDialog
    openingButton={
      <IconButton>
        <AddStandardSizeIcon />
      </IconButton>
    }
    title={<FormattedMessage {...messages.header} />}
    onSubmitForm={handleSubmit}
    submitButtonTitle={<FormattedMessage {...messages.save} />}
    cancelButtonTitle={<FormattedMessage {...messages.cancel} />}
    validate={validate}
  >
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
  </FormDialog>
);

StandardSizeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default StandardSizeForm;
