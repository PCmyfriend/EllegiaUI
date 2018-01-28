import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector}  from 'reselect';
import injectSaga from '../../../utils/injectSaga';
import { addFilmType, loadFilmTypes } from '../actions';
import saga from '../saga';

import messages from './messages';
import FilmTypeForm from './FilmTypeForm';

import { makeSelectNotRecursiveFilmTypes } from '../selectors';

class ManageFilmTypesPage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <FilmTypeForm onSubmit={this.props.onSubmitForm} filmTypes={this.props.filmTypes} />
      </div>
    );
  }
}

ManageFilmTypesPage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  filmTypes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  filmTypes: makeSelectNotRecursiveFilmTypes(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => {
      const filmType = Object.assign({}, values.toJS());
      dispatch(addFilmType(filmType));
    },
    loadFilmTypes: () => dispatch(loadFilmTypes()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'manageFilmTypes', saga });

export default compose(
  withSaga,
  withConnect
)(ManageFilmTypesPage);
