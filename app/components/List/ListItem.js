import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class CustomListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldExpand: false,
    };

    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleListItemClick() {
    this.setState({ shouldExpand: !this.state.shouldExpand });
  }

  render() {
    return (
      <div className={this.props.nested ? this.props.classes.nested : ''}>
        <ListItem button onClick={this.handleListItemClick}>
          {this.props.children}
          <ListItemSecondaryAction>
            {this.props.secondaryActions}
            {this.props.expandable &&
              (this.state.shouldExpand ? <ExpandLess /> : <ExpandMore />)}
          </ListItemSecondaryAction>
        </ListItem>
        {this.props.expandable && (
          <Collapse in={this.state.shouldExpand} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.props.nestedItems}
            </List>
          </Collapse>
        )}
      </div>
    );
  }
}

CustomListItem.propTypes = {
  nestedItems: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  classes: PropTypes.object,
  secondaryActions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  nested: PropTypes.bool,
  expandable: PropTypes.bool,
};

export default withStyles(styles)(CustomListItem);
