import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import SelectField from 'material-ui/SelectField';

class FormSelectField extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.renderSelectField = this.renderSelectField.bind(this);
  }

  renderSelectField({ input, label, meta: { touched, error }, children, ...custom }) {
    return (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => {
          input.onChange(value);
          if (this.props.onChange) {
            this.props.onChange(value);
          }
        }}
        children={children}
        {...custom}
      />
    );
  }

  render() {
    return (
      <Field
        name={this.props.name}
        label={this.props.label}
        component={this.renderSelectField}
        children={this.props.children}
      />
    );
  }
}

FormSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  onChange: PropTypes.func,
};

export default FormSelectField;
