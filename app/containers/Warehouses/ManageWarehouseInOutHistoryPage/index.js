import React from 'react';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import filmTypesSaga from '../../FilmTypes/saga';
import filmTypesReducer from '../../FilmTypes/reducer';
import { makeSelectFilmTypes } from '../../FilmTypes/selectors';
import { loadFilmTypes } from '../../FilmTypes/actions';

import handbookReducerMaker from '../../HandbookMaker/handbookReducerMaker';
import handbookSaga from '../../HandbookMaker/saga';
import { makeSelectHandbookValues } from '../../HandbookMaker/selectors';
import { loadHandbookValues } from '../../HandbookMaker/actions';

import { addWarehouseHistoryRecord } from '../actions';
import saga from '../saga';

import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';

import InOutHistoryForm from './InOutHistoryForm';

class ManageWarehouseInOutHistoryPage extends React.Component {
  componentDidMount() {
    this.props.loadColors();
    this.props.loadFilmTypes();
  }

  render() {
    return (
      <InOutHistoryForm
        measurementUnits={this.props.measurementUnits}
        colors={this.props.colors}
        filmTypes={this.props.filmTypes}
        onSubmitForm={this.props.onSubmitForm}
      />
    );
  }
}

ManageWarehouseInOutHistoryPage.propTypes = {
  colors: PropTypes.object.isRequired,
  filmTypes: PropTypes.object.isRequired,
  measurementUnits: PropTypes.object.isRequired,
  loadColors: PropTypes.func.isRequired,
  loadFilmTypes: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

const mapStateToProps = () =>
  createStructuredSelector({
    colors: makeSelectHandbookValues('colors'),
    filmTypes: makeSelectFilmTypes(),
    measurementUnits: () => [{ id: 1, name: 'kg' }],
  });

function mapDispatchToProps(dispatch) {
  return {
    loadColors: () => dispatch(loadHandbookValues('colors')),
    loadFilmTypes: () => dispatch(loadFilmTypes()),
    onSubmitForm: values => dispatch(addWarehouseHistoryRecord(1, values)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withHandbookValuesSaga = injectSaga({
  key: 'handbookValues',
  saga: handbookSaga,
});

const withFilmTypesSaga = injectSaga({
  key: 'filmTypes',
  saga: filmTypesSaga,
});

const withInOutHistorySaga = injectSaga({
  key: 'inOutHistory',
  saga,
});

const withColorsReducer = injectReducer({
  key: 'colors',
  reducer: handbookReducerMaker('colors'),
});

const withFilmTypesReducer = injectReducer({
  key: 'filmTypes',
  reducer: filmTypesReducer,
});

export default compose(
  withColorsReducer,
  withFilmTypesReducer,
  withHandbookValuesSaga,
  withFilmTypesSaga,
  withConnect,
  withInOutHistorySaga,
)(ManageWarehouseInOutHistoryPage);
