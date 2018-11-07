import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';

import injectSaga from '../../../utils/injectSaga';

import { makeSelectHandbookValues } from '../selectors';
import { loadHandbookValues, deleteHandbookValue } from '../actions';

import saga from '../saga';

import HandbookValuesList from './HandbookValuesList';
import messages from '../messages';

import ContentAddButton from '../../../components/Buttons/ContentAddButton';

class HandbookValuesPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadHandbookValues();
  }

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages[this.props.handbookName]} />
        </h1>
        <HandbookValuesList
          handbookValues={this.props.handbookValues}
          onDeleteHandbookValueClick={this.props.handleDeleteHandbookValueClick}
        />
        <ContentAddButton onClick={this.props.redirectToAddHandbookValuePage} />
      </div>
    );
  }
}

HandbookValuesPage.propTypes = {
  handbookName: PropTypes.string.isRequired,
  handbookValues: PropTypes.object.isRequired,
  loadHandbookValues: PropTypes.func.isRequired,
  redirectToAddHandbookValuePage: PropTypes.func.isRequired,
  handleDeleteHandbookValueClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    handbookValues: makeSelectHandbookValues(ownProps.handbookName),
  });

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadHandbookValues: () =>
      dispatch(loadHandbookValues(ownProps.handbookName)),
    redirectToAddHandbookValuePage: () =>
      dispatch(push(`/${ownProps.handbookSingularName}`)),
    handleDeleteHandbookValueClick: event =>
      dispatch(
        deleteHandbookValue(ownProps.handbookName, event.currentTarget.id),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'handbookValues', saga });

export default compose(
  withSaga,
  withConnect,
)(HandbookValuesPage);
