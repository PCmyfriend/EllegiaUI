import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import injectSaga from '../../../utils/injectSaga';

import PlasticBagTypeForm from './PlasticBagTypeForm';

import { addPlasticBagType } from '../actions';

import messages from './messages';
import saga from '../saga';

class ManagePlasticBagTypePage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <PlasticBagTypeForm onSubmit={this.props.onSubmitForm} />
      </div>
    );
  }
}

ManagePlasticBagTypePage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => {
      const plasticBagType = Object.assign({}, values.toJS());
      dispatch(addPlasticBagType(plasticBagType));
    },
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'managePlasticBagType', saga });

export default compose(
  withConnect,
  withSaga,
)(ManagePlasticBagTypePage);
