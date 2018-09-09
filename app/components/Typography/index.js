import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const CustomTypography = ({ variant, align = 'left', children }) => (
  <Typography variant={variant} gutterBottom align={align}>
    {children}
  </Typography>
);

CustomTypography.propTypes = {
  variant: PropTypes.string.isRequired,
  align: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default withStyles({})(CustomTypography);
