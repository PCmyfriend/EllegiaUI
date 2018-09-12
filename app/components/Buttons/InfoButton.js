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

const CustomButton = ({ onClick, label, classes, variant = 'contained' }) => (
  <Button
    className={classes.button}
    variant={variant}
    onClick={onClick}
    color="primary"
  >
    {label}
  </Button>
);

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  variant: PropTypes.string,
};

export default withStyles(styles)(CustomButton);
