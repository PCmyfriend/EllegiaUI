import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const FormSubmitButton = ({ classes, label, variant = 'contained' }) => (
  <Button
    variant={variant}
    color="primary"
    type="submit"
    className={classes.button}
  >
    {label}
  </Button>
);

FormSubmitButton.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  classes: PropTypes.object.isRequired,
  variant: PropTypes.string,
};

export default withStyles(styles)(FormSubmitButton);
