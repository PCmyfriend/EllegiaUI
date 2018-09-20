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

const FormDialog = ({
  openingButton,
  visible,
  title,
  handleSubmit,
  dialogContent,
  cancelButtonTitle,
  submitButtonTitle,
  handleCancelClick,
  handleShowFormClick,
}) => (
  <span>
    <span role="presentation" onClick={handleShowFormClick}>
      {openingButton}
    </span>
    <Dialog
      onClose={handleCancelClick}
      open={visible}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <CancelButton
            onClick={handleCancelClick}
            label={cancelButtonTitle}
            variant="outlined"
          />
          <SubmitButton label={submitButtonTitle} variant="outlined" />
        </DialogActions>
      </form>
    </Dialog>
  </span>
);

FormDialog.propTypes = {
  openingButton: PropTypes.object.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  cancelButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  dialogContent: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  visible: PropTypes.bool.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  handleShowFormClick: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'formDialog',
})(withStyles({})(FormDialog));
