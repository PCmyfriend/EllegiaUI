import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

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

const Table = ({ columns, data, classes }) => {
  const modifiedColumns = columns.map(c =>
    Object.assign({}, c, { width: columnWidth }),
  );
  return (
    <Paper className={classes.paper}>
      <ReactTable
        columns={modifiedColumns}
        data={data}
        style={{
          textAlign: 'center',
        }}
        defaultPageSize={defaultPageSize}
        previousText={<FormattedMessage {...messages.previousText} />}
        nextText={<FormattedMessage {...messages.nextText} />}
        noDataText={<FormattedMessage {...messages.noRowsFound} />}
        pageText={<FormattedMessage {...messages.pageText} />}
        ofText={<FormattedMessage {...messages.ofText} />}
        rowsText="строк"
      />
    </Paper>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Table);
