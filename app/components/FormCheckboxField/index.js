import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import Checkbox from 'material-ui/Checkbox';

class FormCheckboxField extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.renderCheckbox = this.renderCheckbox.bind(this);
  }

  renderCheckbox({ input, label }) {
    return (
      <Checkbox
        label={label}
        checked={!!input.value}
        onCheck={input.onChange}
      />
    );
  }

  render() {
    return (
      <Field
        name={this.props.name}
        label={this.props.label}
        component={this.renderCheckbox}
      />
    );
  }
}

FormCheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
};

export default FormCheckboxField;
