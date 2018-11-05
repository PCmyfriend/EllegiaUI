import React from 'react';
import PropTypes from 'prop-types';

const getColorStyleByValue = value => {
  if (value > 0) {
    return {
      color: 'green',
    };
  } else if (value < 0) {
    return {
      color: 'red',
    };
  }
  return {};
};

const getValueText = value => {
  if (value > 0) {
    return `↑ ${value}`;
  } else if (value < 0) {
    return `↓ ${value}`;
  }
  return `${value}`;
};

const HighlightedValue = ({ value }) => (
  <span style={getColorStyleByValue(value)}>{getValueText(value)}</span>
);

HighlightedValue.propTypes = {
  value: PropTypes.number.isRequired,
};

export default HighlightedValue;
