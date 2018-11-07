import React from 'react';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { FormattedMessage } from 'react-intl';

import filmTypesSaga from '../../FilmTypes/saga';
import { makeSelectFilmTypes } from '../../FilmTypes/selectors';
import { loadFilmTypes } from '../../FilmTypes/actions';

import makeHandbookReducer from '../../HandbookMaker/handbookReducerMaker';
import handbookSaga from '../../HandbookMaker/saga';
import { makeSelectHandbookValues } from '../../HandbookMaker/selectors';
import { loadHandbookValues } from '../../HandbookMaker/actions';

import { addWarehouseHistoryRecord } from '../actions';

import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';

import HistoryRecordForm from './HistoryRecordForm';

import messages from './messages';

import { TYPE_CUSTOM_PRODUCT, TYPE_FILM_TYPE } from './warehouseItemTypes';

class ManageWarehouseInOutHistoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      warehouseItemTypes: [
        {
          id: TYPE_CUSTOM_PRODUCT,
          name: <FormattedMessage {...messages.customProduct} />,
        },
        {
          id: TYPE_FILM_TYPE,
          name: <FormattedMessage {...messages.filmType} />,
        },
      ],
      selectedWarehouseItemType: TYPE_CUSTOM_PRODUCT,
    };

    this.handleWarehouseItemTypeChange = this.handleWarehouseItemTypeChange.bind(
      this,
    );
  }

  componentDidMount() {
    this.props.loadColors();
    this.props.loadFilmTypes();
    this.props.loadMeasurementUnits();
    this.props.loadProductTypes();
    this.props.loadShifts();
  }

  handleWarehouseItemTypeChange(value) {
    this.setState({ selectedWarehouseItemType: value });
  }

  render() {
    return (
      <HistoryRecordForm
        onSelectWarehouseItemType={this.handleWarehouseItemTypeChange}
        selectedWarehouseItemType={this.state.selectedWarehouseItemType}
        warehouseItemTypes={this.state.warehouseItemTypes}
        measurementUnits={this.props.measurementUnits}
        productTypes={this.props.productTypes}
        colors={this.props.colors}
        filmTypes={this.props.filmTypes}
        shifts={this.props.shifts}
        onSubmitForm={this.props.onSubmitForm}
      />
    );
  }
}

ManageWarehouseInOutHistoryPage.propTypes = {
  shifts: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  filmTypes: PropTypes.object.isRequired,
  measurementUnits: PropTypes.object.isRequired,
  productTypes: PropTypes.object.isRequired,
  loadColors: PropTypes.func.isRequired,
  loadFilmTypes: PropTypes.func.isRequired,
  loadMeasurementUnits: PropTypes.func.isRequired,
  loadProductTypes: PropTypes.func.isRequired,
  loadShifts: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

const mapStateToProps = () =>
  createStructuredSelector({
    shifts: makeSelectHandbookValues('shifts'),
    colors: makeSelectHandbookValues('colors'),
    filmTypes: makeSelectFilmTypes(),
    measurementUnits: makeSelectHandbookValues('measurementUnits'),
    productTypes: makeSelectHandbookValues('productTypes'),
  });

function mapDispatchToProps(dispatch) {
  return {
    loadColors: () => dispatch(loadHandbookValues('colors')),
    loadFilmTypes: () => dispatch(loadFilmTypes()),
    loadMeasurementUnits: () =>
      dispatch(loadHandbookValues('measurementUnits')),
    loadProductTypes: () => dispatch(loadHandbookValues('productTypes')),
    loadShifts: () => dispatch(loadHandbookValues('shifts')),
    onSubmitForm: values => {
      const modifiedValues = Object.assign({}, values.toJS());
      if (modifiedValues.warehouseItemType === TYPE_CUSTOM_PRODUCT) {
        modifiedValues.filmTypeId = null;
      } else if (modifiedValues.warehouseItemType === TYPE_FILM_TYPE) {
        modifiedValues.productTypeId = null;
      }
      modifiedValues.warehouseItemType = null;
      console.log(modifiedValues);
      dispatch(addWarehouseHistoryRecord(1, modifiedValues));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withShiftsReducer = injectReducer({
  key: 'shifts',
  reducer: makeHandbookReducer('shifts'),
});

const withProductTypesReducer = injectReducer({
  key: 'productTypes',
  reducer: makeHandbookReducer('productTypes'),
});

const withHandbookValuesSaga = injectSaga({
  key: 'handbookValues',
  saga: handbookSaga,
});

const withFilmTypesSaga = injectSaga({
  key: 'filmTypes',
  saga: filmTypesSaga,
});

export default compose(
  withShiftsReducer,
  withProductTypesReducer,
  withHandbookValuesSaga,
  withFilmTypesSaga,
  withConnect,
)(ManageWarehouseInOutHistoryPage);
