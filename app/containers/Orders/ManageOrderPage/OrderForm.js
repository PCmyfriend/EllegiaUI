import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import FormTextField from '../../../components/FormTextField';
import FormSelectField from '../../../components/FormSelectField';
import FormCheckboxField from '../../../components/FormCheckboxField';

const validate = (values) => {
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
  requiredFields.forEach((field) => {
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

    this.handlePlasticBagTypeChange = this.handlePlasticBagTypeChange.bind(this);
  }

  handlePlasticBagTypeChange(value) {
    const plasticBagType = this.props.plasticBagTypes.filter((pbt) => pbt.get('id') == value).get(0);
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
          >
            {this.props.customers.map((c) =>
              <MenuItem key={c.get('id')} value={c.get('id')} primaryText={c.get('name')} />
            )}
          </FormSelectField>
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
          >
            {this.props.filmTypes.map((ft) =>
              <MenuItem key={ft.get('id')} value={ft.get('id')} primaryText={ft.get('name')} />
            )}
          </FormSelectField>
        </div>
        <div>
          <FormSelectField
            name="colorId"
            label={<FormattedMessage {...messages.color} />}
          >
            {this.props.colors.map((c) =>
              <MenuItem key={c.get('id')} value={c.get('id')} primaryText={c.get('name')} />
            )}
          </FormSelectField>
        </div>
        <div>
          <FormSelectField
            name="plasticBagTypeId"
            onChange={this.handlePlasticBagTypeChange}
            label={<FormattedMessage {...messages.plasticBagType} />}
          >
            {this.props.plasticBagTypes.map((pbt) =>
              <MenuItem key={pbt.get('id')} value={pbt.get('id')} primaryText={pbt.get('name')} />
            )}
          </FormSelectField>
        </div>
        <div>
          <FormSelectField
            name="standardSizeId"
            label={<FormattedMessage {...messages.standardSize} />}
          >
            {this.state.standardSizes.map((ft) =>
              <MenuItem key={ft.get('id')} value={ft.get('id')} primaryText={ft.get('name')} />
         )}
          </FormSelectField>
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
          >
            {this.props.filmTypeOptions.map((fto) =>
              <MenuItem key={fto.get('id')} value={fto.get('id')} primaryText={fto.get('name')} />
            )}
          </FormSelectField>
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
          <RaisedButton type="submit" label={<FormattedMessage {...messages.save} />} primary />
        </div>
      </form>);
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

