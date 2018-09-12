import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';

import OrderListRow from './OrderListRow';

import orderMessages from './messages';
import orderFormMessages from '../ManageOrderPage/messages';

const styles = () => ({
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  cell: {
    borderLeft: '1px solid lightGrey',
    borderRight: '1px solid lightGrey',
  },
});

const OrdersList = ({
  orders,
  handlePreviewOrderPrintingVersionClick,
  handleDeleteOrderClick,
  classes,
}) => (
  <Paper className={classes.paper}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.customer} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.filmType} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.color} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.plasticBagType} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.standardSize} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.widthInMmError} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.lengthInMmError} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.heightInMmError} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.thicknessInMicron} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.thicknessInMicronError} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.hasCorona} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.filmTypeOption} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.quantityInKg} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderFormMessages.pricePerKg} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderMessages.totalPrice} />
          </TableCell>
          <TableCell className={classes.cell}>
            <FormattedMessage {...orderMessages.actions} />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map(order => (
          <OrderListRow
            key={order.get('id')}
            order={order}
            handlePreviewOrderPrintingVersionClick={
              handlePreviewOrderPrintingVersionClick
            }
            handleDeleteOrderClick={handleDeleteOrderClick}
          />
        ))}
      </TableBody>
    </Table>
  </Paper>
);

OrdersList.propTypes = {
  orders: PropTypes.object.isRequired,
  handlePreviewOrderPrintingVersionClick: PropTypes.func.isRequired,
  handleDeleteOrderClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrdersList);
