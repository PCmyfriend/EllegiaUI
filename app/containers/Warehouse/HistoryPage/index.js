import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import 'react-table/react-table.css';

import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';

import { makeSelectHistoryRecords } from '../selectors';
import { loadWarehouseHistory } from '../actions';

import saga from '../saga';
import reducer from '../reducer';

import HistoryRecordsList from './HistoryRecordsList';

import ManageHistoryPage from '../ManageHistoryPage/Loadable';

class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.loadHistoryRecords();
  }

  render() {
    return (
      <div>
        <HistoryRecordsList historyRecords={this.props.historyRecords} />
        <div>
          <ManageHistoryPage />
        </div>
      </div>
    );
  }
}

HistoryPage.propTypes = {
  historyRecords: PropTypes.object.isRequired,
  loadHistoryRecords: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  historyRecords: makeSelectHistoryRecords(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadHistoryRecords: () => dispatch(loadWarehouseHistory(1)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'warehouseHistoryRecords', saga });

const withReducer = injectReducer({ key: 'warehouses', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(HistoryPage);
