import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { List, ListItem } from 'material-ui/List';

import IconButton from 'material-ui/IconButton';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import { grey400 } from 'material-ui/styles/colors';

import ManageStandardSizePage from '../ManageStandardSizePage';

const getStandardSizesJsxArray = (standardSizes = fromJS([]), onDeleteStandardSizeClick) =>
  standardSizes.map((standardSize) =>
    (<ListItem
      key={standardSize.get('id')}
      rightIconButton={
        <IconButton
          id={`${standardSize.get('plasticBagTypeId')}-${standardSize.get('id')}`}
          onClick={onDeleteStandardSizeClick}
          touch
        >
          <DeleteForeverIcon color={grey400} />
        </IconButton>
      }
      primaryText={`${standardSize.get('name')}`}
    />)
  ).toArray();

const PlasticBagTypeList = ({
    plasticBagTypes,
    onPlasticBagTypeClick,
    expendedPlasticBagTypes,
    onDeletePlasticBagTypeClick,
    onDeleteStandardSizeClick,
  }) => (
    <List>
      {plasticBagTypes.map((plasticBagType) =>
      (<ListItem
        key={plasticBagType.get('id')}
        id={plasticBagType.get('id')}
        rightIconButton={
          <IconButton
            id={plasticBagType.get('id')}
            touch
            onClick={onDeletePlasticBagTypeClick}
          >
            <DeleteForeverIcon color={grey400} />
          </IconButton>
        }
        primaryText={plasticBagType.get('name')}
        onClick={onPlasticBagTypeClick}
        open={expendedPlasticBagTypes[plasticBagType.get('id')] || false}
        nestedItems={[
          ...getStandardSizesJsxArray(plasticBagType.get('standardSizes'), onDeleteStandardSizeClick),
          <ListItem key={-plasticBagType.get('id')}><ManageStandardSizePage plasticBagTypeId={plasticBagType.get('id')} /></ListItem>,
        ]}
      />))}
    </List>
);

PlasticBagTypeList.propTypes = {
  plasticBagTypes: PropTypes.object.isRequired,
  onPlasticBagTypeClick: PropTypes.func.isRequired,
  expendedPlasticBagTypes: PropTypes.object.isRequired,
  onDeletePlasticBagTypeClick: PropTypes.func.isRequired,
  onDeleteStandardSizeClick: PropTypes.func.isRequired,
};

export default PlasticBagTypeList;
