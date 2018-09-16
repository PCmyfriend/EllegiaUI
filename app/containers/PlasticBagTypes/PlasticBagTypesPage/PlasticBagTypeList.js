import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import List from '../../../components/List/List';
import ListItem from '../../../components/List/ListItem';

const getStandardSizesJsxArray = (
  standardSizes = fromJS([]),
  onDeleteStandardSizeClick,
) =>
  standardSizes
    .map(standardSize => (
      <ListItem
        nested
        key={standardSize.get('id')}
        rightIconButton={
          <IconButton
            id={`${standardSize.get('plasticBagTypeId')}-${standardSize.get(
              'id',
            )}`}
            onClick={onDeleteStandardSizeClick}
          >
            <DeleteForeverIcon />
          </IconButton>
        }
      >
        <ListItemText primary={`${standardSize.get('name')}`} />
      </ListItem>
    ))
    .toArray();

const PlasticBagTypeList = ({
  plasticBagTypes,
  onDeletePlasticBagTypeClick,
  onDeleteStandardSizeClick,
}) => (
  <List>
    {plasticBagTypes.map(plasticBagType => (
      <ListItem
        expandable={
          !!plasticBagType.get('standardSizes') &&
          plasticBagType.get('standardSizes').size > 0
        }
        key={plasticBagType.get('id')}
        id={plasticBagType.get('id')}
        secondaryActions={
          <IconButton
            id={plasticBagType.get('id')}
            onClick={onDeletePlasticBagTypeClick}
          >
            <DeleteForeverIcon />
          </IconButton>
        }
        nestedItems={[
          ...getStandardSizesJsxArray(
            plasticBagType.get('standardSizes'),
            onDeleteStandardSizeClick,
          ),
        ]}
      >
        <ListItemText primary={plasticBagType.get('name')} />
      </ListItem>
    ))}
  </List>
);

PlasticBagTypeList.propTypes = {
  plasticBagTypes: PropTypes.object.isRequired,
  onDeletePlasticBagTypeClick: PropTypes.func.isRequired,
  onDeleteStandardSizeClick: PropTypes.func.isRequired,
};

export default withStyles({})(PlasticBagTypeList);
