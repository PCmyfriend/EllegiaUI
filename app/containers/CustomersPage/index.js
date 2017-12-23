import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import { List, ListItem } from 'material-ui/List';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import { loadCustomers } from './actions';
import { makeSelectCustomers } from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

class CustomersPage extends React.PureComponent {

  componentDidMount() {
    this.props.loadCustomers();
  }

  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <List>
          {this.props.customers.map((customer) =>
            <ListItem primaryText={customer.name} />)}
        </List>
      </div>
    );
  }
}

CustomersPage.propTypes = {
  customers: PropTypes.object.isRequired,
  loadCustomers: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  customers: makeSelectCustomers(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadCustomers: () => dispatch(loadCustomers()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'customers', reducer });
const withSaga = injectSaga({ key: 'customers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(CustomersPage);
