import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import injectSaga from '../../../utils/injectSaga';
import { addHandbookValue } from '../actions';
import saga from '../saga';

import messages from '../messages';
import HandbookValueForm from './HandbookValueForm';

class ManageHandbookValuePage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />{' '}
          <FormattedMessage {...messages[this.props.handbookSingularName]} />
        </h1>
        <HandbookValueForm
          onSubmit={this.props.onSubmitForm}
          handbookSingularName={this.props.handbookSingularName}
        />
      </div>
    );
  }
}

ManageHandbookValuePage.propTypes = {
  handbookSingularName: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmitForm: values => {
      const handbookValue = Object.assign({}, values.toJS());
      dispatch(addHandbookValue(ownProps.handbookName, handbookValue));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'manageHandbookValue', saga });

export default compose(
  withSaga,
  withConnect,
)(ManageHandbookValuePage);
