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

const SubmitButton = ({ classes, label }) => (
  <Button
    variant="contained"
    color="primary"
    type="submit"
    className={classes.button}
  >
    {label}
  </Button>
);

SubmitButton.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubmitButton);
