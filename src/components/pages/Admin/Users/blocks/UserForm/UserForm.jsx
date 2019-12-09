import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import validate from 'validate.js';
import _get from "lodash/get";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ErrorShower from '../../../../../organisms/Admin/ErrorShower';

import { ROLES } from '../../../../../../constants';

import { defaultSchema, passwordSchema, dealerSchema } from './schema';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    overflowY: 'scroll',
  },
  actionsWrap: {
    justifyContent: 'flex-end',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  confirmWrap: {
    position: 'relative',
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

function UserForm(props) {
  const { texts, user, dealers, statuses, onCancel, onSubmit, onCloseError } = props;
  const styles = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      login: user.login || '',
      password: '',
      confirm: '',
      role: user.role || ROLES.DEALER,
      dealer_id: (dealers.find(dealer => dealer.id === user.dealer_id) || []).id || 0
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    let compiledSchema = defaultSchema;
    if (!user.id || formState.values.password) {
      compiledSchema = {
        ...compiledSchema,
        ...passwordSchema,
      };
    }
    if (formState.values.role === ROLES.DEALER) {
      compiledSchema = {
        ...compiledSchema,
        ...dealerSchema
      };
    }
    console.log(compiledSchema);
    const errors = validate(formState.values, compiledSchema);

    setFormState(oldFormState => ({
      ...oldFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values, user.id]);

  const handleChange = event => {
    event.persist();
    const { name, type, value, checked } = event.target;
    setFormState(oldFormState => ({
      ...oldFormState,
      values: {
        ...oldFormState.values,
        [name]: type === 'checkbox' ? checked : value,
      },
      touched: {
        ...oldFormState.touched,
        [name]: true,
      },
    }));
  };

  const hasError = field => Boolean(formState.touched[field] && formState.errors[field]);

  const handleSubmitForm = event => {
    event.preventDefault();
    if (!formState.isValid) {
      return;
    }
    onSubmit(formState.values);
  };

  const roles = [
    // {
    //   value: 'user',
    //   label: 'Пользователь',
    // },
    {
      value: ROLES.ADMIN,
      label: 'Администратор',
    },
    {
      value: ROLES.DEALER,
      label: 'Дилер',
    },
  ];

  return (
    <Card className={styles.root}>
      <form autoComplete="off" noValidate onSubmit={handleSubmitForm}>
        <CardHeader subheader={texts.subtitle} title={texts.title} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('login')}
                helperText={hasError('login') ? formState.errors.login[0] : null}
                label="Логин"
                margin="dense"
                name="login"
                onChange={handleChange}
                required
                value={formState.values.login}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('password')}
                helperText={hasError('password') ? formState.errors.password[0] : null}
                label="Пароль"
                margin="dense"
                name="password"
                type="password"
                onChange={handleChange}
                required={!user.id}
                value={formState.values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('confirm')}
                helperText={hasError('confirm') ? formState.errors.confirm[0] : null}
                label="Повторите пароль"
                margin="dense"
                name="confirm"
                type="password"
                onChange={handleChange}
                required={!user.id}
                value={formState.values.confirm}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Выберите роль"
                error={hasError('role')}
                helperText={hasError('role') ? formState.errors.role[0] : null}
                margin="dense"
                name="role"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={formState.values.role}
                variant="outlined"
              >
                {roles.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            {formState.values.role === ROLES.DEALER && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Выберите дилера"
                  error={hasError('dealer_id')}
                  helperText={hasError('dealer_id') ? formState.errors.dealer_id[0] : null}
                  margin="dense"
                  name="dealer_id"
                  onChange={handleChange}
                  required
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  value={formState.values.dealer_id}
                  variant="outlined"
                >
                  <option key="0" value={0}>
                    Не выбрано
                  </option>
                  {dealers.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={styles.actionsWrap}>
          <div className={styles.confirmWrap}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!formState.isValid || statuses.loading}
            >
              {texts.submit}
            </Button>
            {statuses.loading && <CircularProgress size={24} className={styles.buttonProgress} />}
          </div>
          <Button color="primary" variant="outlined" onClick={onCancel}>
            Отмена
          </Button>
        </CardActions>
      </form>
      <ErrorShower
        open={Boolean(statuses.error)}
        message={_get(statuses, 'error.message')}
        onClose={onCloseError}
        position={{
          vertical: 'top',
          horizontal: 'right'
        }}
      />
    </Card>
  );
}

UserForm.propTypes = {
  texts: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    submit: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    role: PropTypes.oneOf(Object.values(ROLES)),
  }),
  dealers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseError: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  user: {
    id: null,
  },
  dealers: [],
};

export default UserForm;
