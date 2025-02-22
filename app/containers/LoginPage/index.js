import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import LoginForm from './LoginForm';
import messages from './messages';
import { loginUser } from './actions';
import saga from './saga';
import reducer from './reducer';

class LoginPage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <div>
          <LoginForm onSubmit={this.props.onSubmitForm} />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  onSubmitForm: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: values => {
      dispatch(loginUser(values.toJS()));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
