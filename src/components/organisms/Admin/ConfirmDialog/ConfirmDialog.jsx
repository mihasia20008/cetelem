import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

function ConfirmDialog(props) {
  const { open, texts, onCancel, onConfirm } = props;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle>
        {texts.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {texts.body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} variant="contained" color="primary">
          {texts.confirm}
        </Button>
        <Button onClick={onCancel} variant="outlined" color="primary">
          {texts.cancel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  texts: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.node,
    cancel: PropTypes.string,
    confirm: PropTypes.string,
  })
};

ConfirmDialog.defaultProps = {
  open: false,
  texts: {}
};

export default ConfirmDialog;
