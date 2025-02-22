/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';

import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';

import HomePage from '../../containers/HomePage/Loadable';
import LoginPage from '../../containers/LoginPage/Loadable';
import HandbooksPage from '../../containers/HandbooksPage/Loadable';
import CustomersPage from '../../containers/Customers/CustomersPage/Loadable';
import ManageCustomerPage from '../../containers/Customers/ManageCustomerPage/Loadable';
import FilmTypesPage from '../../containers/FilmTypes/FilmTypesPage/Loadable';
import ManageFilmTypePage from '../../containers/FilmTypes/ManageFilmTypePage/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import Header from '../../components/Header';
import Progress from '../../components/Progress';
import NotificationsCenter from '../../components/NotificationCenter';
import HandbookValuesPage from '../../containers/HandbookMaker/HandbookValuesPage/Loadable';
import ManageHandbookValuePage from '../../containers/HandbookMaker/ManageHandbookValuePage/Loadable';
import PlasticBagTypesPage from '../../containers/PlasticBagTypes/PlasticBagTypesPage/Loadable';
import ManagePlasticBagTypePage from '../../containers/PlasticBagTypes/ManagePlasticBagTypePage/Loadable';
import ManageOrderPage from '../../containers/Orders/ManageOrderPage/Loadable';
import WarehouseHistoryPage from '../../containers/Warehouse/HistoryPage/Loadable';

const userIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state =>
    !!(state.get('user') && state.get('user').get('authPayload')),
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectAction: routerActions.replace,
});

const locationHelper = locationHelperBuilder({});

const userIsNotAuthenticated = connectedReduxRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  authenticatedSelector: state =>
    !state.get('user') || !state.get('user').get('authPayload'),
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectAction: routerActions.replace,
});

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#79B716',
      contrastText: '#fff',
    },
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <div>
        <Header />
        <Progress />
        <NotificationsCenter />
        <div className="centered-container">
          <Switch>
            <Route exact path="/" component={userIsAuthenticated(HomePage)} />
            <Route
              path="/login"
              component={userIsNotAuthenticated(LoginPage)}
            />
            <Route
              path="/handbooks"
              component={userIsAuthenticated(HandbooksPage)}
            />
            <Route
              path="/customers"
              component={userIsAuthenticated(CustomersPage)}
            />
            <Route
              path="/customer"
              component={userIsAuthenticated(ManageCustomerPage)}
            />
            <Route
              path="/filmTypes"
              component={userIsAuthenticated(FilmTypesPage)}
            />
            <Route
              path="/filmType"
              component={userIsAuthenticated(ManageFilmTypePage)}
            />
            <Route
              path="/order"
              component={userIsAuthenticated(ManageOrderPage)}
            />
            <Route
              path="/colors"
              component={userIsAuthenticated(() => (
                <HandbookValuesPage
                  handbookName="colors"
                  handbookSingularName="color"
                />
              ))}
            />
            <Route
              path="/color"
              component={userIsAuthenticated(() => (
                <ManageHandbookValuePage
                  handbookName="colors"
                  handbookSingularName="color"
                />
              ))}
            />
            <Route
              path="/plasticBagTypes"
              component={userIsAuthenticated(PlasticBagTypesPage)}
            />
            <Route
              path="/plasticBagType"
              component={userIsAuthenticated(ManagePlasticBagTypePage)}
            />
            <Route
              path="/filmTypeOptions"
              component={userIsAuthenticated(() => (
                <HandbookValuesPage
                  handbookName="filmTypeOptions"
                  handbookSingularName="filmTypeOption"
                />
              ))}
            />
            <Route
              path="/filmTypeOption"
              component={userIsAuthenticated(() => (
                <ManageHandbookValuePage
                  handbookName="filmTypeOptions"
                  handbookSingularName="filmTypeOption"
                />
              ))}
            />
            <Route
              path="/measurementUnits"
              component={userIsAuthenticated(() => (
                <HandbookValuesPage
                  handbookName="measurementUnits"
                  handbookSingularName="measurementUnit"
                />
              ))}
            />
            <Route
              path="/measurementUnit"
              component={userIsAuthenticated(() => (
                <ManageHandbookValuePage
                  handbookName="measurementUnits"
                  handbookSingularName="measurementUnit"
                />
              ))}
            />
            <Route
              path="/warehouseHistory"
              component={userIsAuthenticated(WarehouseHistoryPage)}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
