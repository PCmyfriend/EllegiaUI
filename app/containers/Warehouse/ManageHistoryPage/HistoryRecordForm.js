import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FormDialog from '../../../components/FormDialog';
import FormSelectField from '../../../components/FormSelectField';
import FormTextField from '../../../components/FormTextField';
import ContentAddButton from '../../../components/Buttons/ContentAddButton';

import messages from './messages';

import { TYPE_CUSTOM_PRODUCT, TYPE_FILM_TYPE } from './warehouseItemTypes';

const makeValidationFunc = selectedType => values => {
  const errors = {};
  const requiredFields = ['colorId', 'measurementUnitId', 'amount'];

  if (selectedType === TYPE_FILM_TYPE) {
    requiredFields.push('filmTypeId');
  } else if (selectedType === TYPE_CUSTOM_PRODUCT) {
    requiredFields.push('productTypeId');
  }

  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = 'Обязательное поле';
    }
  });
  return errors;
};

const HistoryRecordForm = ({
  warehouseItemTypes,
  shifts,
  selectedWarehouseItemType,
  onSelectWarehouseItemType,
  measurementUnits,
  colors,
  filmTypes,
  productTypes,
  onSubmitForm,
}) => (
  <FormDialog
    openingButton={<ContentAddButton />}
    title={<FormattedMessage {...messages.header} />}
    onSubmitForm={onSubmitForm}
    submitButtonTitle={<FormattedMessage {...messages.save} />}
    cancelButtonTitle={<FormattedMessage {...messages.cancel} />}
    validate={makeValidationFunc(selectedWarehouseItemType)}
  >
    <FormSelectField
      name="warehouseItemType"
      label={<FormattedMessage {...messages.warehouseItemType} />}
      data={warehouseItemTypes}
      onChange={onSelectWarehouseItemType}
    />
    {selectedWarehouseItemType === TYPE_CUSTOM_PRODUCT && (
      <FormSelectField
        name="productTypeId"
        label={<FormattedMessage {...messages.productType} />}
        data={productTypes.toJS()}
      />
    )}
    {selectedWarehouseItemType === TYPE_FILM_TYPE && (
      <FormSelectField
        name="filmTypeId"
        label={<FormattedMessage {...messages.filmType} />}
        data={filmTypes.toJS()}
      />
    )}
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
    <FormSelectField
      name="shiftId"
      label={<FormattedMessage {...messages.shift} />}
      data={[
        { id: null, name: <FormattedMessage {...messages.notSelected} /> },
        ...shifts.toJS(),
      ]}
    />
  </FormDialog>
);

HistoryRecordForm.propTypes = {
  warehouseItemTypes: PropTypes.array.isRequired,
  selectedWarehouseItemType: PropTypes.number.isRequired,
  onSelectWarehouseItemType: PropTypes.func.isRequired,
  measurementUnits: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  filmTypes: PropTypes.object.isRequired,
  productTypes: PropTypes.object.isRequired,
  shifts: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export default HistoryRecordForm;
