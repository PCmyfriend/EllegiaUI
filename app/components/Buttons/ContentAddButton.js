import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const ContentAddButton = ({ onClick, classes }) => (
  <Button
    variant="fab"
    color="primary"
    aria-label="Add"
    className={classes.button}
    onClick={onClick}
  >
    <AddIcon />
  </Button>
);

ContentAddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles({})(ContentAddButton);
