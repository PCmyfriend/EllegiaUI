import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';

const HandbookValuesList = ({ handbookValues, onDeleteHandbookValueClick }) => (
  <div>
    <List>
      {handbookValues.map(handbookValue => (
        <ListItem
          id={handbookValue.get('id')}
          key={handbookValue.get('id')}
          primaryText={handbookValue.get('name')}
          rightIconButton={
            <IconButton
              id={handbookValue.get('id')}
              onClick={onDeleteHandbookValueClick}
              touch
            >
              <DeleteForeverIcon color={grey400} />
            </IconButton>
          }
        />
      ))}
    </List>
  </div>
);

HandbookValuesList.propTypes = {
  handbookValues: PropTypes.object.isRequired,
  onDeleteHandbookValueClick: PropTypes.func.isRequired,
};

export default HandbookValuesList;
