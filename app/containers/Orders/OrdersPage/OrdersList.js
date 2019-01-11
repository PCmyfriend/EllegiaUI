/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import Table from '../../../components/Table/Loadable';

import orderMessages from './messages';
import orderFormMessages from '../ManageOrderPage/messages';
import OrderRoutesFormDialog from '../ManageOrderRoutes';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const OrdersList = ({
  orders,
  handlePreviewOrderPrintingVersionClick,
  handleDeleteOrderClick,
  classes,
}) => (
  <Table
    columns={[
      {
        id: 'productTypeName',
        Header: <FormattedMessage {...orderFormMessages.productTypeName} />,
        accessor: o => o.productType.name,
      },
      {
        id: 'filmType',
        Header: <FormattedMessage {...orderFormMessages.filmType} />,
        accessor: o => o.productType.filmType.name,
      },
      {
        id: 'color',
        Header: <FormattedMessage {...orderFormMessages.color} />,
        accessor: o => o.productType.color.name,
      },
      {
        id: 'plasticBagType',
        Header: <FormattedMessage {...orderFormMessages.plasticBagType} />,
        accessor: o => o.productType.standardSize.plasticBagType.name,
      },
      {
        id: 'standardSize',
        Header: <FormattedMessage {...orderFormMessages.standardSize} />,
        accessor: o => o.productType.standardSize.name,
      },
      {
        id: 'thicknessInMicron',
        Header: <FormattedMessage {...orderFormMessages.thicknessInMicron} />,
      },
      {
        id: 'hasCorona',
        Header: <FormattedMessage {...orderFormMessages.hasCorona} />,
        accessor: o => o,
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
      },
      {
        id: 'quantityInKg',
        Header: <FormattedMessage {...orderFormMessages.quantityInKg} />,
        accessor: o => o.quantityInKg,
      },
      {
        id: 'pricePerKg',
        Header: <FormattedMessage {...orderFormMessages.pricePerKg} />,
        accessor: o => o.pricePerKg,
      },
      {
        id: 'totalPrice',
        Header: <FormattedMessage {...orderFormMessages.totalSum} />,
        accessor: o => o.totalPrice,
      },
      {
        id: 'actions',
        Header: <FormattedMessage {...orderMessages.actions} />,
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
  />
);

OrdersList.propTypes = {
  orders: PropTypes.object.isRequired,
  handlePreviewOrderPrintingVersionClick: PropTypes.func.isRequired,
  handleDeleteOrderClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrdersList);
