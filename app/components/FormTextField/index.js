/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form/immutable';

import { TextField } from 'redux-form-material-ui';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});

const FormTextField = ({ name, label, classes, type }) => (
  <Field
    name={name}
    component={TextField}
    label={label}
    className={classes.textField}
    margin="normal"
    type={type}
  />
);
FormTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default withStyles(styles)(FormTextField);
