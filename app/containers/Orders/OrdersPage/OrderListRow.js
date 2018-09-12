import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import OrderRoutesFormDialog from '../ManageOrderRoutes';
import InfoButton from '../../../components/Buttons/InfoButton';
import CancelButton from '../../../components/Buttons/CancelButton';

const styles = () => ({
  cell: {
    width: '240px',
    textAlign: 'center',
    borderLeft: '1px solid lightGrey',
    borderRight: '1px solid lightGrey',
  },
});

const OrderListRow = ({
  order,
  handlePreviewOrderPrintingVersionClick,
  handleDeleteOrderClick,
  classes,
}) => {
  const customer = order.get('customer');
  const productType = order.get('productType');
  return (
    <TableRow>
      <TableCell className={classes.cell}>
        <span>{customer.get('name')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('name')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('color').get('name')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('standardSize').get('name')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('standardSize').get('name')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('widthInMmError')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('lengthInMmError')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('heightInMmError')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('thicknessInMicron')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('thicknessInMicronError')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('hasCorona')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{productType.get('filmTypeOption').get('name')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{order.get('quantityInKg')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{order.get('pricePerKg')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <span>{order.get('totalPrice')}</span>
      </TableCell>
      <TableCell className={classes.cell}>
        <div>
          <div>
            <InfoButton
              variant="text"
              label={<FormattedMessage {...messages.print} />}
              onClick={() =>
                handlePreviewOrderPrintingVersionClick(order.get('id'))
              }
            />
          </div>
          {order.get('isMine') && (
            <div>
              <OrderRoutesFormDialog order={order} />
            </div>
          )}
          <div>
            <CancelButton
              variant="text"
              label={<FormattedMessage {...messages.delete} />}
              onClick={() => handleDeleteOrderClick(order.get('id'))}
            />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

OrderListRow.propTypes = {
  order: PropTypes.object.isRequired,
  handlePreviewOrderPrintingVersionClick: PropTypes.func.isRequired,
  handleDeleteOrderClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderListRow);
