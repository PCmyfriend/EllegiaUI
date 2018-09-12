import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { List, ListItem } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const renderFilmTypes = (
  filmTypes = fromJS([]),
  onDeleteFilmTypeClick,
  expendedFilmTypes,
  onFilmTypeClick,
) =>
  filmTypes
    .map(filmType => (
      <ListItem
        id={filmType.get('id')}
        key={filmType.get('id')}
        primaryText={filmType.get('name')}
        nestedItems={renderFilmTypes(
          filmType.get('children'),
          onDeleteFilmTypeClick,
          expendedFilmTypes,
          onFilmTypeClick,
        )}
        open={expendedFilmTypes[filmType.get('id')] || false}
        onClick={onFilmTypeClick}
        rightIconButton={
          <IconButton
            id={filmType.get('id')}
            onClick={onDeleteFilmTypeClick}
            touch
          >
            <DeleteForeverIcon />
          </IconButton>
        }
      />
    ))
    .toArray();

const FilmTypesList = ({
  filmTypes,
  expendedFilmTypes,
  onFilmTypeClick,
  onDeleteFilmTypeClick,
}) => (
  <List>
    {renderFilmTypes(
      filmTypes,
      onDeleteFilmTypeClick,
      expendedFilmTypes,
      onFilmTypeClick,
    )}
  </List>
);

FilmTypesList.propTypes = {
  filmTypes: PropTypes.object.isRequired,
  onDeleteFilmTypeClick: PropTypes.func.isRequired,
  onFilmTypeClick: PropTypes.func.isRequired,
  expendedFilmTypes: PropTypes.object.isRequired,
};

export default FilmTypesList;
