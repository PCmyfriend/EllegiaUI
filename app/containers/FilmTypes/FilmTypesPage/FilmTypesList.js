import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ListItemText from '@material-ui/core/ListItemText';

import List from '../../../components/List/List';
import ListItem from '../../../components/List/ListItem';

const renderFilmTypes = (
  filmTypes = fromJS([]),
  onDeleteFilmTypeClick,
  nested = false,
) =>
  filmTypes
    .map(filmType => (
      <ListItem
        expandable={
          !!filmType.get('children') && filmType.get('children').size > 0
        }
        nested={nested}
        id={filmType.get('id')}
        key={filmType.get('id')}
        nestedItems={renderFilmTypes(
          filmType.get('children'),
          onDeleteFilmTypeClick,
          true,
        )}
        secondaryActions={
          <IconButton id={filmType.get('id')} onClick={onDeleteFilmTypeClick}>
            <DeleteForeverIcon />
          </IconButton>
        }
      >
        <ListItemText primary={filmType.get('name')} />
      </ListItem>
    ))
    .toArray();

const FilmTypesList = ({ filmTypes, onDeleteFilmTypeClick }) => (
  <List>{renderFilmTypes(filmTypes, onDeleteFilmTypeClick)}</List>
);

FilmTypesList.propTypes = {
  filmTypes: PropTypes.object.isRequired,
  onDeleteFilmTypeClick: PropTypes.func.isRequired,
};

export default withStyles({})(FilmTypesList);
