import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import injectSaga from '../../../utils/injectSaga';

import { makeSelectFilmTypes } from '../../FilmTypes/selectors';
import { loadFilmTypes } from '../actions';

import messages from './messages';
import saga from '../saga';

import FilmTypesList from './FilmTypesList';

class FilmTypesPage extends React.PureComponent {

  componentDidMount() {
    this.props.loadFilmTypes();
  }

  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <FilmTypesList filmTypes={this.props.filmTypes} />
        <FloatingActionButton onClick={this.props.redirectToAddFilmTypePage}>
          <ContentAdd />
        </FloatingActionButton >
      </div>
    );
  }
}

FilmTypesPage.propTypes = {
  filmTypes: PropTypes.object.isRequired,
  loadFilmTypes: PropTypes.func.isRequired,
  redirectToAddFilmTypePage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  filmTypes: makeSelectFilmTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadFilmTypes: () => dispatch(loadFilmTypes()),
    redirectToAddFilmTypePage: () => dispatch(push('/filmType')),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'filmTypes', saga });

export default compose(
  withSaga,
  withConnect,
)(FilmTypesPage);

