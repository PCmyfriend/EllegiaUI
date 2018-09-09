/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import OrdersPage from '../Orders/OrdersPage/Loadable';

class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div>
          <OrdersPage />
        </div>
        <div style={{ marginTop: '20px' }}>
          <FloatingActionButton onClick={this.props.redirectToAddOrderPage}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  redirectToAddOrderPage: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    redirectToAddOrderPage: () => dispatch(push('/order')),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
