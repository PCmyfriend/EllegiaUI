/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContentInbox from '@material-ui/icons/Inbox';
import ActionGrade from '@material-ui/icons/Grade';
import ContentSend from '@material-ui/icons/Send';
import ContentDrafts from '@material-ui/icons/Drafts';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import Link from '../../components/A';
import messages from './messages';

import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';

class CommonHandbooksPage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Link to="/filmTypes">
                  <FormattedMessage {...messages.filmTypes} />
                </Link>
              }
            />
            <ActionGrade />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Link to="/filmTypeOptions">
                  <FormattedMessage {...messages.filmOptions} />
                </Link>
              }
            />
            <ContentSend />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Link to="/plasticBagTypes">
                  <FormattedMessage {...messages.plasticBagTypes} />
                </Link>
              }
            />
            <ContentDrafts />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Link to="/colors">
                  <FormattedMessage {...messages.colors} />
                </Link>
              }
            />
            <ContentInbox />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Link to="/measurementUnits">
                  <FormattedMessage {...messages.measurementUnits} />
                </Link>
              }
            />
            <ContentInbox />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles({})(CommonHandbooksPage);
