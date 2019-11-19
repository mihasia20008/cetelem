import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import validate from 'validate.js';

import { makeStyles } from '@material-ui/styles';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const schema = {
  email: {
    presence: { allowEmpty: false, message: '- обязательное поле!' },
    email: {
      message: "- неверное значение!"
    },
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: '- обязательное поле!' },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  content: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  buttonWrapper: {
    position: 'relative',
  },
  button: {
    margin: theme.spacing(2, 0),
  },
  buttonProgress: {
    color: theme.palette.white,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Login = () => {
  // const { history } = props;

  const styles = useStyles();

  const [formState, setFormState] = useState({
    isLoading: false,
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
    setFormState(oldFormState => ({
      ...oldFormState,
      isLoading: true,
    }));
    setTimeout(() => {
      setFormState(oldFormState => ({
        ...oldFormState,
        isLoading: false,
      }));
    }, 2000);
    // history.push('/');
  };

  const hasError = field => (Boolean(formState.touched[field] && formState.errors[field]));

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
                error={hasError('email')}
                fullWidth
                helperText={hasError('email') ? formState.errors.email[0] : null}
                label="E-mail"
                name="email"
                onChange={handleChange}
                type="text"
                value={formState.values.email || ''}
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
                {formState.isLoading && <CircularProgress size={24} className={styles.buttonProgress} />}
              </div>
            </form>
          </div>
        </div>
      </Grid>
    </div>
  );
};

// Login.propTypes = {
//   history: PropTypes.object,
// };

export default withRouter(Login);
