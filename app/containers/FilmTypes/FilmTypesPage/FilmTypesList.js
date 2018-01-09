import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { List, ListItem } from 'material-ui';

const renderFilmTypes = (filmTypes = fromJS([])) => filmTypes.map((filmType) =>
  (<ListItem
    key={filmType.get('id')}
    primaryText={filmType.get('name')}
    nestedItems={renderFilmTypes(filmType.get('children'))}
  />)
).toArray();

const FilmTypesList = ({ filmTypes }) => (
  <List>
    {renderFilmTypes(filmTypes)}
  </List>
);


FilmTypesList.propTypes = {
  filmTypes: PropTypes.object.isRequired,
};

export default FilmTypesList;
