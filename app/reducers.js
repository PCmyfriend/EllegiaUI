/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import { reducer as notifications } from 'react-notification-system-redux';
import customers from './containers/Customers/reducer';
import contactTypes from './containers/ContactTypes/reducer';
import filmTypes from './containers/FilmTypes/reducer';
import makeHandbookReducer from './containers/HandbookMaker/handbookReducerMaker';
import plasticBagTypes from './containers/PlasticBagTypes/reducer';
import orders from './containers/Orders/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    form: reduxFormReducer,
    notifications,
    customers,
    contactTypes,
    filmTypes,
    colors: makeHandbookReducer('colors'),
    plasticBagTypes,
    filmTypeOptions: makeHandbookReducer('filmTypeOptions'),
    measurementUnits: makeHandbookReducer('measurementUnits'),
    orders,
    ...injectedReducers,
  });
}
