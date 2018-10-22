import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FormDialog from '../../../components/FormDialog';
import FormSelectField from '../../../components/FormSelectField';
import FormTextField from '../../../components/FormTextField';
import ContentAddButton from '../../../components/Buttons/ContentAddButton';

import messages from './messages';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'filmTypeId',
    'colorId',
    'measurementUnitId',
    'amount',
  ];
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = 'Обязательное поле';
    }
  });
  return errors;
};

const HistoryRecordForm = ({
  measurementUnits,
  colors,
  filmTypes,
  onSubmitForm,
}) => (
  <FormDialog
    openingButton={<ContentAddButton />}
    title={<FormattedMessage {...messages.header} />}
    onSubmitForm={onSubmitForm}
    submitButtonTitle={<FormattedMessage {...messages.save} />}
    cancelButtonTitle={<FormattedMessage {...messages.cancel} />}
    validate={validate}
  >
    <FormSelectField
      name="filmTypeId"
      label={<FormattedMessage {...messages.filmType} />}
      data={filmTypes.toJS()}
    />
    <FormSelectField
      name="colorId"
      label={<FormattedMessage {...messages.color} />}
      data={colors.toJS()}
    />
    <FormSelectField
      name="measurementUnitId"
      label={<FormattedMessage {...messages.measurementUnit} />}
      data={measurementUnits.toJS()}
    />
    <FormTextField
      name="amount"
      label={<FormattedMessage {...messages.amount} />}
    />
  </FormDialog>
);

HistoryRecordForm.propTypes = {
  measurementUnits: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  filmTypes: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export default HistoryRecordForm;
