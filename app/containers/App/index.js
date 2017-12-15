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

import { Grid, Row, Col } from 'react-flexbox-grid';

import HomePage from '../../containers/HomePage/Loadable';
import HandbooksPage from '../../containers/HandbooksPage/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import Header from '../../components/Header';

export default function App() {
  return (
    <MuiThemeProvider>
      <div>
        <Header />
        <div className="centered-container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/handbooks" component={HandbooksPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
