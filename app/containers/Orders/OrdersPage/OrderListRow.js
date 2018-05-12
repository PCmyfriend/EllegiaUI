import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const OrderListRow = ({ order, handlePreviewOrderPrintingVersionClick, columnWidth, tableCellStyle }) => {
  const customer = order.get('customer');
  const productType = order.get('productType');
  return (
    <TableRow>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{customer.get('name')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('name')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('color').get('name')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('standardSize').get('name')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('standardSize').get('name')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('widthInMmError')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('lengthInMmError')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('heightInMmError')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('thicknessInMicron')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('thicknessInMicronError')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('hasCorona')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{productType.get('filmTypeOption').get('name')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{order.get('quantityInKg')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{order.get('pricePerKg')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <span>{order.get('totalPrice')}</span>
      </TableRowColumn>
      <TableRowColumn width={columnWidth} style={tableCellStyle}>
        <RaisedButton
          label={<FormattedMessage {...messages.print} />}
          primary
          onClick={() => handlePreviewOrderPrintingVersionClick(order.get('id'))}
        />
      </TableRowColumn>
    </TableRow>
  );
};

OrderListRow.propTypes = {
  order: PropTypes.object.isRequired,
  columnWidth: PropTypes.number.isRequired,
  tableCellStyle: PropTypes.object.isRequired,
  handlePreviewOrderPrintingVersionClick: PropTypes.func.isRequired,
};

export default OrderListRow;
