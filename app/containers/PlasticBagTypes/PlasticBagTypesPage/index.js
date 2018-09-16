import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { push } from 'react-router-redux';

import ContentAddButton from '../../../components/Buttons/ContentAddButton';

import injectSaga from '../../../utils/injectSaga';

import {
  loadPlasticBagTypes,
  deletePlasticBagType,
  deleteStandardSize,
} from '../actions';
import { makeSelectPlasticBagTypes } from '../selectors';
import messages from './messages';
import saga from '../saga';

import PlasticBagTypeList from './PlasticBagTypeList';

class PlasticBagTypesPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadPlasticBagTypes();
  }

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <PlasticBagTypeList
          plasticBagTypes={this.props.plasticBagTypes}
          onDeletePlasticBagTypeClick={
            this.props.handleDeletePlasticBagTypeClick
          }
          onDeleteStandardSizeClick={this.props.handleDeleteStandardSizeClick}
        />
        <ContentAddButton
          onClick={this.props.redirectToAddPlasticBagTypePage}
        />
      </div>
    );
  }
}

PlasticBagTypesPage.propTypes = {
  plasticBagTypes: PropTypes.object.isRequired,
  loadPlasticBagTypes: PropTypes.func.isRequired,
  redirectToAddPlasticBagTypePage: PropTypes.func.isRequired,
  handleDeletePlasticBagTypeClick: PropTypes.func.isRequired,
  handleDeleteStandardSizeClick: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  plasticBagTypes: makeSelectPlasticBagTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPlasticBagTypes: () => dispatch(loadPlasticBagTypes()),
    redirectToAddPlasticBagTypePage: () => dispatch(push('/plasticBagType')),
    handleDeletePlasticBagTypeClick: event =>
      dispatch(deletePlasticBagType(event.currentTarget.id)),
    handleDeleteStandardSizeClick: event => {
      const plasticBagTypeAndStandardSizeIds = event.currentTarget.id.split(
        '-',
      );
      dispatch(
        deleteStandardSize(
          plasticBagTypeAndStandardSizeIds[0],
          plasticBagTypeAndStandardSizeIds[1],
        ),
      );
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'plasticBagTypes', saga });

export default compose(
  withSaga,
  withConnect,
)(PlasticBagTypesPage);
