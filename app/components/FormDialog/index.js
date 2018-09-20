import React from 'react';
import PropTypes from 'prop-types';

import FormDialog from './FormDialog';

class ManageFormDialogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this.handleShowFormClick = this.handleShowFormClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleShowFormClick() {
    this.setState({ isVisible: true });
  }

  handleCancelClick() {
    this.setState({ isVisible: false });
  }

  handleSubmit(values) {
    this.setState({ isVisible: false });
    this.props.onSubmitForm(values);
  }

  render() {
    return (
      <FormDialog
        title={this.props.title}
        openingButton={this.props.openingButton}
        cancelButtonTitle={this.props.cancelButtonTitle}
        submitButtonTitle={this.props.submitButtonTitle}
        visible={this.state.isVisible}
        dialogContent={this.props.children}
        handleCancelClick={this.handleCancelClick}
        handleShowFormClick={this.handleShowFormClick}
        onSubmit={this.handleSubmit}
        validate={this.props.validate || (() => {})}
      />
    );
  }
}

ManageFormDialogPage.propTypes = {
  openingButton: PropTypes.object.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  submitButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  cancelButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  validate: PropTypes.func,
};

export default ManageFormDialogPage;
