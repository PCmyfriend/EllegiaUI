/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Link from '../../components/A';
import messages from './messages';

export default class CommonHandbooksPage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <List>
          <ListItem
            primaryText={
              <Link to="/filmTypes">
                <FormattedMessage {...messages.filmTypes} />
              </Link>
            }
            leftIcon={<ActionGrade />}
          />
          <ListItem
            primaryText={
              <Link to="/filmTypeOptions">
                <FormattedMessage {...messages.filmOptions} />
              </Link>
            }
            leftIcon={<ContentSend />}
          />
          <ListItem
            primaryText={
              <Link to="/plasticBagTypes">
                <FormattedMessage {...messages.plasticBagTypes} />
              </Link>
            }
            leftIcon={<ContentDrafts />}
          />
          <ListItem
            primaryText={
              <Link to="/colors">
                <FormattedMessage {...messages.colors} />
              </Link>
            }
            leftIcon={<ContentInbox />}
          />
        </List>
      </div>
    );
  }
}
