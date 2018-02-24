import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import injectSaga from '../../../utils/injectSaga';

import ordersSaga from '../saga';
import filmTypesSaga from '../../FilmTypes/saga';
import customersSaga from '../../Customers/saga';
import handbooksSaga from '../../HandbookMaker/saga';
import plasticBagTypesSaga from '../../PlasticBagTypes/saga';

import { makeSelectNotRecursiveFilmTypes } from '../../FilmTypes/selectors';
import { makeSelectCustomers } from '../../Customers/selectors';
import { makeSelectHandbookValues } from '../../HandbookMaker/selectors';
import { makeSelectPlasticBagTypes } from '../../PlasticBagTypes/selectors';

import { loadFilmTypes } from '../../FilmTypes/actions';
import { loadHandbookValues } from '../../HandbookMaker/actions';
import { loadCustomers } from '../../Customers/actions';
import { loadPlasticBagTypes } from '../../PlasticBagTypes/actions';
import { addOrder } from '../actions';

import messages from './messages';

import OrderForm from './OrderForm';

class Orders extends React.PureComponent {

  componentDidMount() {
    this.props.loadCustomers();
    this.props.loadCustomers();
    this.props.loadColors();
    this.props.loadFilmTypeOptions();
    this.props.loadFilmTypes();
    this.props.loadPlasticBagTypes();
  }

  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <OrderForm
          filmTypes={this.props.filmTypes}
          customers={this.props.customers}
          colors={this.props.colors}
          filmTypeOptions={this.props.filmTypeOptions}
          plasticBagTypes={this.props.plasticBagTypes}
          onSubmit={this.props.onSubmitForm}
        />
      </div>
    );
  }
}

Orders.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  customers: PropTypes.object.isRequired,
  filmTypes: PropTypes.object.isRequired,
  filmTypeOptions: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  plasticBagTypes: PropTypes.object.isRequired,
  loadCustomers: PropTypes.func.isRequired,
  loadFilmTypes: PropTypes.func.isRequired,
  loadColors: PropTypes.func.isRequired,
  loadFilmTypeOptions: PropTypes.func.isRequired,
  loadPlasticBagTypes: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  customers: makeSelectCustomers(),
  filmTypes: makeSelectNotRecursiveFilmTypes(),
  colors: makeSelectHandbookValues('colors'),
  filmTypeOptions: makeSelectHandbookValues('filmTypeOptions'),
  plasticBagTypes: makeSelectPlasticBagTypes(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => {
      dispatch(addOrder(values));
    },
    loadCustomers: () => dispatch(loadCustomers()),
    loadFilmTypes: () => dispatch(loadFilmTypes()),
    loadColors: () => dispatch(loadHandbookValues('colors')),
    loadFilmTypeOptions: () => dispatch(loadHandbookValues('filmTypeOptions')),
    loadPlasticBagTypes: () => dispatch(loadPlasticBagTypes()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withCustomersSaga = injectSaga({ key: 'customers', saga: customersSaga });
const withFilmTypesSaga = injectSaga({ key: 'filmTypes', saga: filmTypesSaga });
const withOrdersSaga = injectSaga({ key: 'orders', saga: ordersSaga });
const withHandbookSaga = injectSaga({ key: 'handbook', saga: handbooksSaga });
const withPlasticBagTypesSaga = injectSaga({ key: 'plasticBagTypes', saga: plasticBagTypesSaga });

export default compose(
  withOrdersSaga,
  withCustomersSaga,
  withFilmTypesSaga,
  withHandbookSaga,
  withPlasticBagTypesSaga,
  withConnect
)(Orders);
