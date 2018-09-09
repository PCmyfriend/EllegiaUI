import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox } from 'redux-form-material-ui';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: 300,
  },
});

const FormCheckboxField = ({ name, label, classes }) => (
  <FormControl className={classes.formControl}>
    <FormControlLabel
      control={<Field name={name} component={Checkbox} />}
      label={label}
    />
  </FormControl>
);

FormCheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormCheckboxField);
