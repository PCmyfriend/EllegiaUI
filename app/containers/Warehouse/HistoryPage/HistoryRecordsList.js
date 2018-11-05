import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import Table from '../../../components/Table/Loadable';

import messages from './messages';

const HistoryRecordsList = ({ historyRecords }) => (
  <Table
    columns={[
      {
        id: 'operationDateTime',
        Header: <FormattedMessage {...messages.operationDateTime} />,
        accessor: hr => hr.formattedOperationDateTime,
      },
      {
        id: 'type',
        Header: <FormattedMessage {...messages.type} />,
        accessor: hr => hr.type,
      },
      {
        id: 'name',
        Header: <FormattedMessage {...messages.name} />,
        accessor: hr => hr.name,
      },
      {
        id: 'color',
        Header: <FormattedMessage {...messages.color} />,
        accessor: hr => hr.color.name,
      },
      {
        id: 'amount',
        Header: <FormattedMessage {...messages.amount} />,
        accessor: hr => hr.amount,
      },
      {
        id: 'measurementUnit',
        Header: <FormattedMessage {...messages.measurementUnit} />,
        accessor: hr => hr.measurementUnit.name,
      },
      {
        id: 'order',
        Header: <FormattedMessage {...messages.order} />,
        accessor: hr => (hr.order ? hr.order.name : '-'),
      },
      {
        id: 'shift',
        Header: <FormattedMessage {...messages.shift} />,
        accessor: hr => (hr.shift ? hr.shift.name : '-'),
      },
    ]}
    data={historyRecords.toJS()}
  />
);

HistoryRecordsList.propTypes = {
  historyRecords: PropTypes.object.isRequired,
};

export default HistoryRecordsList;
