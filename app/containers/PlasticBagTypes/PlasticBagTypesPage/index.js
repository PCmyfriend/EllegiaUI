import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { push } from 'react-router-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import injectSaga from '../../../utils/injectSaga';

import { loadPlasticBagTypes, deletePlasticBagType, deleteStandardSize } from '../actions';
import { makeSelectPlasticBagTypes } from '../selectors';
import messages from './messages';
import saga from '../saga';

import PlasticBagTypeList from './PlasticBagTypeList';

class PlasticBagTypesPage extends React.PureComponent {

  constructor(context, state) {
    super(context, state);

    this.state = {
      expandedPlasticBagTypes: {},
    };

    this.handlePlasticBagTypeClick = this.handlePlasticBagTypeClick.bind(this);
  }

  componentDidMount() {
    this.props.loadPlasticBagTypes();
  }

  handlePlasticBagTypeClick(event) {
    const plasticBagTypeId = event.currentTarget.id;
    const expandedPlasticBagTypes = this.state.expandedPlasticBagTypes;
    expandedPlasticBagTypes[plasticBagTypeId] = !expandedPlasticBagTypes[plasticBagTypeId];
    this.setState({ expandedPlasticBagTypes: Object.assign({}, expandedPlasticBagTypes) });
  }

  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <PlasticBagTypeList
          plasticBagTypes={this.props.plasticBagTypes}
          onPlasticBagTypeClick={this.handlePlasticBagTypeClick}
          onDeletePlasticBagTypeClick={this.props.handleDeletePlasticBagTypeClick}
          onDeleteStandardSizeClick={this.props.handleDeleteStandardSizeClick}
          expendedPlasticBagTypes={this.state.expandedPlasticBagTypes}
        />
        <FloatingActionButton onClick={this.props.redirectToAddPlasticBagTypePage}>
          <ContentAdd />
        </FloatingActionButton >
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
    handleDeletePlasticBagTypeClick: (event) => dispatch(deletePlasticBagType(event.currentTarget.id)),
    handleDeleteStandardSizeClick: (event) => dispatch(deleteStandardSize(event.currentTarget.id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'plasticBagTypes', saga });

export default compose(
  withSaga,
  withConnect
)(PlasticBagTypesPage);
