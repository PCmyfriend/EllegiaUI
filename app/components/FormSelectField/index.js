import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const FormSelectField = ({ name, label, data, onChange, classes }) => (
  <FormControl className={classes.formControl}>
    <Field
      name={name}
      label={label}
      component={TextField}
      select
      onChange={({ target }) => {
        if (onChange) {
          onChange(target.value);
        }
      }}
    >
      {data.map(pair => (
        <MenuItem key={pair.id} value={pair.id}>
          {pair.name}
        </MenuItem>
      ))}
    </Field>
  </FormControl>
);

FormSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default withStyles(styles)(FormSelectField);
