import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import validate from 'validate.js';
import _get from 'lodash/get';

import {
  Grid,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Snackbar,
  SnackbarContent,
  IconButton,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

import { tryLogin, resetLoginStatus } from '../../../../redux/modules/user/actions';

import { schema } from './schema';
import { useStyles } from './styles';

const Login = props => {
  const { loading, error, errorMessage, dispatch } = props;

  const styles = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(oldFormState => ({
      ...oldFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(oldFormState => ({
      ...oldFormState,
      values: {
        ...oldFormState.values,
        [event.target.name]:
          event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
      touched: {
        ...oldFormState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    dispatch(tryLogin(formState.values.login, formState.values.password));
  };

  const hasError = field => Boolean(formState.touched[field] && formState.errors[field]);

  const handleClose = () => dispatch(resetLoginStatus());

  return (
    <div className={styles.root}>
      <Grid className={styles.grid} container>
        <div className={styles.content}>
          <div className={styles.contentBody}>
            <form className={styles.form} onSubmit={handleSignIn}>
              <Typography className={styles.title} variant="h2">
                Авторизация
              </Typography>
              <TextField
                className={styles.textField}
                error={hasError('login')}
                fullWidth
                helperText={hasError('login') ? formState.errors.login[0] : null}
                label="Логин"
                name="login"
                onChange={handleChange}
                type="text"
                value={formState.values.login || ''}
                variant="outlined"
              />
              <TextField
                className={styles.textField}
                error={hasError('password')}
                fullWidth
                helperText={hasError('password') ? formState.errors.password[0] : null}
                label="Пароль"
                name="password"
                onChange={handleChange}
                type="password"
                value={formState.values.password || ''}
                variant="outlined"
              />
              <div className={styles.buttonWrapper}>
                <Button
                  className={styles.button}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Войти
                </Button>
                {loading && <CircularProgress size={24} className={styles.buttonProgress} />}
              </div>
            </form>
          </div>
        </div>
      </Grid>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={error}
        onClose={handleClose}
        aria-describedby="login-error"
      >
        <SnackbarContent
          className={styles.snackbar}
          message={
            <span id="client-snackbar" className={styles.snackbarMessage}>
            <ErrorIcon className={styles.snackbarIcon} />
              {errorMessage}
          </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon className={styles.snackbarClose} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    errorMessage: _get(state, 'user.data.message', '')
  };
};

export default connect(mapStateToProps)(Login);
