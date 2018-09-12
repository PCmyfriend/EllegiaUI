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

const CancelButton = ({ onClick, classes, label, variant = 'contained' }) => (
  <Button
    variant={variant}
    color="secondary"
    className={classes.button}
    onClick={onClick}
  >
    {label}
  </Button>
);

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  variant: PropTypes.string,
};

export default withStyles(styles)(CancelButton);
