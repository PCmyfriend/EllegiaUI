/* eslint-disable eqeqeq */
import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import FormTextField from '../../../components/FormTextField';
import FormSelectField from '../../../components/FormSelectField';
import FormCheckboxField from '../../../components/FormCheckboxField';
import SubmitButton from '../../../components/FormSubmitButton';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'customerId',
    'filmTypeId',
    'standardSizeId',
    'filmTypeOptionId',
    'contactId',
    'colorId',
    'name',
    'quantityInKg',
    'pricePerKg',
    'thicknessInMicron',
    'thicknessInMicronError',
    'totalSum',
    'widthInMmError',
    'lengthInMmError',
  ];
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = 'Обязательное поле';
    }
  });
  return errors;
};

class OrderForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      standardSizes: fromJS([]),
    };

    this.handlePlasticBagTypeChange = this.handlePlasticBagTypeChange.bind(
      this,
    );
  }

  handlePlasticBagTypeChange(value) {
    const plasticBagType = this.props.plasticBagTypes
      .filter(pbt => pbt.get('id') == value)
      .get(0);
    const standardSizes = fromJS(plasticBagType.get('standardSizes') || []);
    return this.setState({ standardSizes });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <FormSelectField
            name="customerId"
            label={<FormattedMessage {...messages.customer} />}
            data={this.props.customers.toJS()}
          />
        </div>
        <div>
          <FormTextField
            name="name"
            label={<FormattedMessage {...messages.name} />}
          />
        </div>
        <div>
          <FormSelectField
            name="filmTypeId"
            label={<FormattedMessage {...messages.filmType} />}
            data={this.props.filmTypes.toJS()}
          />
        </div>
        <div>
          <FormSelectField
            name="colorId"
            label={<FormattedMessage {...messages.color} />}
            data={this.props.colors.toJS()}
          />
        </div>
        <div>
          <FormSelectField
            name="plasticBagTypeId"
            onChange={this.handlePlasticBagTypeChange}
            label={<FormattedMessage {...messages.plasticBagType} />}
            data={this.props.plasticBagTypes.toJS()}
          />
        </div>
        <div>
          <FormSelectField
            name="standardSizeId"
            label={<FormattedMessage {...messages.standardSize} />}
            data={this.state.standardSizes.toJS()}
          />
        </div>
        <div>
          <FormTextField
            name="widthInMmError"
            label={<FormattedMessage {...messages.widthInMmError} />}
          />
        </div>
        <div>
          <FormTextField
            name="lengthInMmError"
            label={<FormattedMessage {...messages.lengthInMmError} />}
          />
        </div>
        <div>
          <FormTextField
            name="heightInMmError"
            label={<FormattedMessage {...messages.heightInMmError} />}
          />
        </div>
        <div>
          <FormTextField
            name="thicknessInMicron"
            label={<FormattedMessage {...messages.thicknessInMicron} />}
          />
        </div>
        <div>
          <FormTextField
            name="thicknessInMicronError"
            label={<FormattedMessage {...messages.thicknessInMicronError} />}
          />
        </div>
        <div>
          <FormCheckboxField
            name="hasCorona"
            label={<FormattedMessage {...messages.hasCorona} />}
          />
        </div>
        <div>
          <FormSelectField
            name="filmTypeOptionId"
            label={<FormattedMessage {...messages.filmTypeOption} />}
            data={this.props.filmTypeOptions.toJS()}
          />
        </div>
        <div>
          <FormTextField
            name="quantityInKg"
            label={<FormattedMessage {...messages.quantityInKg} />}
          />
        </div>
        <div>
          <FormTextField
            name="pricePerKg"
            label={<FormattedMessage {...messages.pricePerKg} />}
          />
        </div>
        <div>
          <SubmitButton label={<FormattedMessage {...messages.save} />} />
        </div>
      </form>
    );
  }
}

OrderForm.propTypes = {
  customers: PropTypes.object.isRequired,
  filmTypes: PropTypes.object.isRequired,
  filmTypeOptions: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  plasticBagTypes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'orderForm',
  validate,
})(OrderForm);
