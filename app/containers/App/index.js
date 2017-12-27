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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';

import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';

import HomePage from '../../containers/HomePage/Loadable';
import LoginPage from '../../containers/LoginPage/Loadable';
import HandbooksPage from '../../containers/HandbooksPage/Loadable';
import CustomersPage from '../../containers/Customers/CustomersPage/Loadable';
import ManageCustomerPage from '../../containers/Customers/ManageCustomerPage/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import Header from '../../components/Header';
import Progress from '../../components/Progress';
import NotificationsCenter from '../../components/NotificationCenter';

const userIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: (state) => !!(state.get('user') && state.get('user').get('authPayload')),
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectAction: routerActions.replace,
});

const locationHelper = locationHelperBuilder({});

const userIsNotAuthenticated = connectedReduxRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  authenticatedSelector: (state) => !state.get('user') || !state.get('user').get('authPayload'),
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectAction: routerActions.replace,
});

export default function App() {
  return (
    <MuiThemeProvider>
      <div>
        <Header />
        <Progress />
        <NotificationsCenter />
        <div className="centered-container">
          <Switch>
            <Route exact path="/" component={userIsAuthenticated(HomePage)} />
            <Route path="/login" component={userIsNotAuthenticated(LoginPage)} />
            <Route path="/handbooks" component={userIsAuthenticated(HandbooksPage)} />
            <Route path="/customers" component={userIsAuthenticated(CustomersPage)} />
            <Route path="/customer" component={userIsAuthenticated(ManageCustomerPage)} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
