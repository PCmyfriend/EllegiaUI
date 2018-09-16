import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import injectSaga from '../../../utils/injectSaga';

import { makeSelectFilmTypes } from '../../FilmTypes/selectors';
import { loadFilmTypes, deleteFilmType } from '../actions';

import messages from './messages';
import saga from '../saga';

import FilmTypesList from './FilmTypesList';
import ContentAddButton from '../../../components/Buttons/ContentAddButton';

class FilmTypesPage extends React.Component {
  componentDidMount() {
    this.props.loadFilmTypes();
  }

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <FilmTypesList
          filmTypes={this.props.filmTypes}
          onDeleteFilmTypeClick={this.props.handleDeleteFilmTypeClick}
        />
        <ContentAddButton onClick={this.props.redirectToAddFilmTypePage} />
      </div>
    );
  }
}

FilmTypesPage.propTypes = {
  filmTypes: PropTypes.object.isRequired,
  loadFilmTypes: PropTypes.func.isRequired,
  redirectToAddFilmTypePage: PropTypes.func.isRequired,
  handleDeleteFilmTypeClick: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  filmTypes: makeSelectFilmTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadFilmTypes: () => dispatch(loadFilmTypes()),
    redirectToAddFilmTypePage: () => dispatch(push('/filmType')),
    handleDeleteFilmTypeClick: event =>
      dispatch(deleteFilmType(event.currentTarget.id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'filmTypes', saga });

export default compose(
  withSaga,
  withConnect,
)(FilmTypesPage);
