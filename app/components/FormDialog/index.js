import React from 'react';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form/immutable';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { withStyles } from '@material-ui/core/styles';

import SubmitButton from './../FormSubmitButton';
import CancelButton from './../Buttons/CancelButton';

class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this.handleShowFormClick = this.handleShowFormClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleShowFormClick() {
    this.setState({ isVisible: true });
  }

  handleCancelClick() {
    this.setState({ isVisible: false });
  }

  render() {
    return (
      <span>
        <span role="presentation" onClick={this.handleShowFormClick}>
          {this.props.openingButton}
        </span>
        <Dialog
          onClose={this.handleCancelClick}
          open={this.state.isVisible}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
          <form onSubmit={this.props.handleSubmit}>
            <DialogContent>{this.props.children}</DialogContent>
            <DialogActions>
              <CancelButton
                onClick={this.handleCancelClick}
                label={this.props.cancelButtonTitle}
                variant="outlined"
              />
              <SubmitButton
                label={this.props.submitButtonTitle}
                variant="outlined"
              />
            </DialogActions>
          </form>
        </Dialog>
      </span>
    );
  }
}

FormDialog.propTypes = {
  openingButton: PropTypes.object.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  cancelButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default reduxForm({
  form: 'formDialog',
})(withStyles({})(FormDialog));
