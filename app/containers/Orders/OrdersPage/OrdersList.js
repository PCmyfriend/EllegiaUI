/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import orderMessages from './messages';
import orderFormMessages from '../ManageOrderPage/messages';
import OrderRoutesFormDialog from '../ManageOrderRoutes';

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

const OrdersList = ({
  orders,
  handlePreviewOrderPrintingVersionClick,
  handleDeleteOrderClick,
  classes,
}) => (
  <Paper className={classes.paper}>
    <ReactTable
      columns={[
        {
          id: 'customer',
          Header: <FormattedMessage {...orderFormMessages.customer} />,
          accessor: o => o.customer.name,
          width: columnWidth,
        },
        {
          id: 'productTypeName',
          Header: <FormattedMessage {...orderFormMessages.productTypeName} />,
          accessor: o => o.productType.name,
          width: columnWidth,
        },
        {
          id: 'filmType',
          Header: <FormattedMessage {...orderFormMessages.filmType} />,
          accessor: o => o.productType.filmType.name,
          width: columnWidth,
        },
        {
          id: 'color',
          Header: <FormattedMessage {...orderFormMessages.color} />,
          accessor: o => o.productType.color.name,
          width: columnWidth,
        },
        {
          id: 'plasticBagType',
          Header: <FormattedMessage {...orderFormMessages.plasticBagType} />,
          accessor: o => o.productType.standardSize.plasticBagType.name,
          width: columnWidth,
        },
        {
          id: 'standardSize',
          Header: <FormattedMessage {...orderFormMessages.standardSize} />,
          accessor: o => o.productType.standardSize.name,
          width: columnWidth,
        },
        {
          id: 'widthInMmError',
          Header: <FormattedMessage {...orderFormMessages.widthInMmError} />,
          accessor: o => o.productType.widthInMmError,
          width: columnWidth,
        },
        {
          id: 'lengthInMmError',
          Header: <FormattedMessage {...orderFormMessages.lengthInMmError} />,
          accessor: o => o.productType.lengthInMmError,
          width: columnWidth,
        },
        {
          id: 'heightInMmError',
          Header: <FormattedMessage {...orderFormMessages.heightInMmError} />,
          accessor: o => o.productType.heightInMmError,
          width: columnWidth,
        },
        {
          id: 'thicknessInMicron',
          Header: <FormattedMessage {...orderFormMessages.thicknessInMicron} />,
          accessor: o => o.productType.thicknessInMicron,
          width: columnWidth,
        },
        {
          id: 'thicknessInMicronError',
          Header: (
            <FormattedMessage {...orderFormMessages.thicknessInMicronError} />
          ),
          accessor: o => o.productType.thicknessInMicronError,
          width: columnWidth,
        },
        {
          id: 'hasCorona',
          Header: <FormattedMessage {...orderFormMessages.hasCorona} />,
          accessor: o => o,
          width: columnWidth,
          Cell: ({ value: order }) =>
            order.productType.hasCorona ? (
              <FormattedMessage {...orderMessages.yesText} />
            ) : (
              <FormattedMessage {...orderMessages.noText} />
            ),
        },
        {
          id: 'filmTypeOption',
          Header: <FormattedMessage {...orderFormMessages.filmTypeOption} />,
          accessor: o => o.productType.filmTypeOption.name,
          width: columnWidth,
        },
        {
          id: 'quantityInKg',
          Header: <FormattedMessage {...orderFormMessages.quantityInKg} />,
          accessor: o => o.quantityInKg,
          width: columnWidth,
        },
        {
          id: 'pricePerKg',
          Header: <FormattedMessage {...orderFormMessages.pricePerKg} />,
          accessor: o => o.pricePerKg,
          width: columnWidth,
        },
        {
          id: 'totalPrice',
          Header: <FormattedMessage {...orderFormMessages.totalSum} />,
          accessor: o => o.totalPrice,
          width: columnWidth,
        },
        {
          id: 'actions',
          Header: <FormattedMessage {...orderMessages.actions} />,
          width: columnWidth,
          accessor: o => o,
          Cell: ({ value: order }) => (
            <div>
              <IconButton
                className={classes.button}
                onClick={() => handlePreviewOrderPrintingVersionClick(order.id)}
              >
                <PrintIcon />
              </IconButton>
              {order.isMine && <OrderRoutesFormDialog order={order} />}
              {order.isDeletionPermitted && (
                <IconButton
                  className={classes.button}
                  onClick={() => handleDeleteOrderClick(order.id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          ),
        },
      ]}
      data={orders.toJS()}
      previousText={<FormattedMessage {...orderMessages.previousText} />}
      nextText={<FormattedMessage {...orderMessages.nextText} />}
      noDataText={<FormattedMessage {...orderMessages.noRowsFound} />}
      pageText={<FormattedMessage {...orderMessages.pageText} />}
      ofText={<FormattedMessage {...orderMessages.ofText} />}
      rowsText="строк"
      style={{
        textAlign: 'center',
      }}
      defaultPageSize={defaultPageSize}
    />
  </Paper>
);

OrdersList.propTypes = {
  orders: PropTypes.object.isRequired,
  handlePreviewOrderPrintingVersionClick: PropTypes.func.isRequired,
  handleDeleteOrderClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrdersList);
