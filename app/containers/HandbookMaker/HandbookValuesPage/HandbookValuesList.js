import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import List from '../../../components/List/List';
import ListItem from '../../../components/List/ListItem';

const HandbookValuesList = ({ handbookValues, onDeleteHandbookValueClick }) => (
  <div>
    <List>
      {handbookValues.map(handbookValue => (
        <ListItem
          id={handbookValue.get('id')}
          key={handbookValue.get('id')}
          secondaryActions={
            <IconButton
              id={handbookValue.get('id')}
              onClick={onDeleteHandbookValueClick}
            >
              <DeleteForeverIcon />
            </IconButton>
          }
        >
          <ListItemText primary={handbookValue.get('name')} />
        </ListItem>
      ))}
    </List>
  </div>
);

HandbookValuesList.propTypes = {
  handbookValues: PropTypes.object.isRequired,
  onDeleteHandbookValueClick: PropTypes.func.isRequired,
};

export default withStyles({})(HandbookValuesList);
