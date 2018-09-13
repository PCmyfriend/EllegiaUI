/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import orderMessages from './messages';
import orderFormMessages from '../ManageOrderPage/messages';
import InfoButton from '../../../components/Buttons/InfoButton';
import OrderRoutesFormDialog from '../ManageOrderRoutes';
import CancelButton from '../../../components/Buttons/CancelButton';

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

const columnWidth = 240;

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
          id: 'filmType',
          Header: <FormattedMessage {...orderFormMessages.filmType} />,
          accessor: o => o.productType.name,
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
          accessor: o => o.productType.color.name,
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
          accessor: o => o.productType.hasCorona,
          width: columnWidth,
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
              <div>
                <InfoButton
                  variant="text"
                  label={<FormattedMessage {...orderMessages.print} />}
                  onClick={() =>
                    handlePreviewOrderPrintingVersionClick(order.id)
                  }
                />
              </div>
              {order.isMine && (
                <div>
                  <OrderRoutesFormDialog order={order} />
                </div>
              )}
              <div>
                <CancelButton
                  variant="text"
                  label={<FormattedMessage {...orderMessages.delete} />}
                  onClick={() => handleDeleteOrderClick(order.id)}
                />
              </div>
            </div>
          ),
        },
      ]}
      data={orders.toJS()}
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
