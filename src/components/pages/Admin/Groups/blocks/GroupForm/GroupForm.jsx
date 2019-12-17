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

import { defaultSchema } from './schema';

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

function GroupForm(props) {
  const { texts, group, statuses, onCancel, onSubmit, onCloseError } = props;
  const styles = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      name: group.name || '',
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, defaultSchema);

    setFormState(oldFormState => ({
      ...oldFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

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
                error={hasError('name')}
                helperText={hasError('name') ? formState.errors.name[0] : null}
                label="Название"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={formState.values.name}
                variant="outlined"
              />
            </Grid>
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

GroupForm.propTypes = {
  texts: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    submit: PropTypes.string,
  }).isRequired,
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseError: PropTypes.func.isRequired,
};

GroupForm.defaultProps = {
  group: {
    id: null,
  },
};

export default GroupForm;
