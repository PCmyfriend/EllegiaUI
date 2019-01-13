import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import 'react-table/react-table.css';

import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';

import { makeSelectHistoryRecords } from '../selectors';
import { loadWarehouseHistory } from '../actions';

import saga from '../saga';
import reducer from '../reducer';

import HistoryRecordsList from './HistoryRecordsList';

import ManageHistoryPage from '../ManageHistoryPage/Loadable';

import messages from './messages';

class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.loadHistoryRecords();
  }

  render() {
    return (
      <div style={{ width: '95vw', marginLeft: '-7.5vw' }}>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <HistoryRecordsList historyRecords={this.props.historyRecords} />
        <div style={{ marginTop: '20px' }}>
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

const withReducer = injectReducer({ key: 'warehouses', reducer });

const withSaga = injectSaga({ key: 'warehouseHistoryRecords', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HistoryPage);
