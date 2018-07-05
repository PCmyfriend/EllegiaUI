import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableRow, TableHeader, TableHeaderColumn } from 'material-ui/Table';
import { FormattedMessage } from 'react-intl';

import OrderListRow from './OrderListRow';

import orderMessages from './messages';
import orderFormMessages from '../ManageOrderPage/messages';

const tableCellStyle = {
  textAlign: 'center',
  borderLeft: '1px solid lightGrey',
  borderRight: '1px solid lightGrey',
};

const columnWidth = 210;

const OrdersList = ({ orders, handlePreviewOrderPrintingVersionClick, handleDeleteOrderClick }) => (
  <Table bodyStyle={{ overflow: 'visible' }}>
    <TableHeader
      adjustForCheckbox={false}
      displaySelectAll={false}
    >
      <TableRow>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.customer} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.filmType} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.color} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.plasticBagType} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.standardSize} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.widthInMmError} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.lengthInMmError} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.heightInMmError} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.thicknessInMicron} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.thicknessInMicronError} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.hasCorona} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.filmTypeOption} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.quantityInKg} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderFormMessages.pricePerKg} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderMessages.totalPrice} /></TableHeaderColumn>
        <TableHeaderColumn width={columnWidth} style={tableCellStyle}><FormattedMessage {...orderMessages.actions} /></TableHeaderColumn>
        <TableHeaderColumn width={500} style={tableCellStyle}><FormattedMessage {...orderMessages.actions} /></TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
    >
      {orders.map((order) =>
        (<OrderListRow
          key={order.get('id')}
          order={order}
          columnWidth={columnWidth}
          tableCellStyle={tableCellStyle}
          handlePreviewOrderPrintingVersionClick={handlePreviewOrderPrintingVersionClick}
          handleDeleteOrderClick={handleDeleteOrderClick}
        />)
      )}
    </TableBody>
  </Table>
);

OrdersList.propTypes = {
  orders: PropTypes.object.isRequired,
  handlePreviewOrderPrintingVersionClick: PropTypes.func.isRequired,
  handleDeleteOrderClick: PropTypes.func.isRequired,
};

export default OrdersList;
