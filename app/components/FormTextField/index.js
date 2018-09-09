import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import TextField from 'material-ui/TextField';

class FormTextField extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.renderTextField = this.renderTextField.bind(this);
  }

  renderTextField({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    );
  }

  render() {
    return (
      <Field
        name={this.props.name}
        label={this.props.label}
        type={this.props.type}
        component={this.renderTextField}
      />
    );
  }
}

FormTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  type: PropTypes.string,
};

export default FormTextField;
