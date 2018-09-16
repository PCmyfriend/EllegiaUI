import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import { makeSelectLoading } from './selectors';

/* eslint-disable react/prefer-stateless-function */
class Progress extends React.Component {
  render() {
    return (
      <div>{this.props.loading && <LinearProgress color="secondary" />}</div>
    );
  }
}

Progress.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'progress', reducer });

export default compose(
  withConnect,
  withReducer,
)(withStyles({})(Progress));
