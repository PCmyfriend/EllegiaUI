import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import ReactTable from 'react-table';

import { FormattedMessage } from 'react-intl';

import messages from './messages';

const styles = theme => ({
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  cell: {
    borderLeft: '1px solid lightGrey',
    borderRight: '1px solid lightGrey',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const columnWidth = 240;
const defaultPageSize = 10;

const HistoryRecordsList = ({ historyRecords, classes }) => (
  <Paper className={classes.paper}>
    <ReactTable
      columns={[
        {
          id: 'operationDateTime',
          Header: <FormattedMessage {...messages.operationDateTime} />,
          accessor: hr => hr.operationDateTime,
          width: columnWidth,
        },
        {
          id: 'filmType',
          Header: <FormattedMessage {...messages.filmType} />,
          accessor: hr => hr.filmTypeId,
        },
        {
          id: 'color',
          Header: <FormattedMessage {...messages.color} />,
          accessor: hr => hr.colorId,
        },
        {
          id: 'amount',
          Header: <FormattedMessage {...messages.amount} />,
          accessor: hr => hr.amount,
        },
        {
          id: 'measurementUnit',
          Header: <FormattedMessage {...messages.measurementUnit} />,
          accessor: hr => hr.measurementUnitId,
        },
      ]}
      data={historyRecords.toJS()}
      style={{
        textAlign: 'center',
      }}
      defaultPageSize={defaultPageSize}
    />
  </Paper>
);

HistoryRecordsList.propTypes = {
  historyRecords: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoryRecordsList);
