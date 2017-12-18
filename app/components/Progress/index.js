import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import { makeSelectLoading } from './selectors';

class Progress extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {this.props.loading && <LinearProgress mode="indeterminate" color="red" />}
      </div>
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
  withReducer
)(Progress);
