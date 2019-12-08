import React from 'react';
import PropTypes from 'prop-types';

import _noop from 'lodash/noop';

import {IconButton, Snackbar, SnackbarContent} from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  snackbar: {
    backgroundColor: theme.palette.error.dark,
  },
  snackbarMessage: {
    display: 'flex',
    alignItems: 'center',
  },
  snackbarIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  snackbarClose: {
    fontSize: 20,
  }
}));

function ErrorShower(props) {
  const { open, autoHideDuration, message, onClose, position } = props;
  const styles = useStyles();

  return (
    <Snackbar
      autoHideDuration={autoHideDuration}
      anchorOrigin={position}
      open={open}
      onClose={onClose}
      aria-describedby="error-shower"
    >
      <SnackbarContent
        className={styles.snackbar}
        message={
          <span id="client-snackbar" className={styles.snackbarMessage}>
            <ErrorIcon className={styles.snackbarIcon} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={styles.snackbarClose} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}

ErrorShower.propTypes = {
  open: PropTypes.bool.isRequired,
  autoHideDuration: PropTypes.number,
  message: PropTypes.string,
  onClose: PropTypes.func,
  position: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
  })
};

ErrorShower.defaultProps = {
  autoHideDuration: 3000,
  message: '',
  onClose: _noop,
  position: {
    vertical: 'bottom',
    horizontal: 'center'
  }
};

export default ErrorShower;
