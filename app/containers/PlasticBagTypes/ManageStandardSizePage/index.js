import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import StandardSizeForm from './StandardSizeForm';

import { addStandardSize } from '../actions';

import messages from './messages';

class ManageStandardSizePage extends React.PureComponent {
  render() {
    return (
      <div>
        <StandardSizeForm form={`standardSizeForm_${this.props.plasticBagTypeId}`} onSubmit={this.props.onSubmitForm} />
      </div>
    );
  }
}

ManageStandardSizePage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  plasticBagTypeId: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmitForm: (values) => {
      const standardSize = Object.assign({}, values.toJS(), { id: 0, plasticBagTypeId: ownProps.plasticBagTypeId });
      dispatch(addStandardSize(standardSize));
    },
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect
)(ManageStandardSizePage);
