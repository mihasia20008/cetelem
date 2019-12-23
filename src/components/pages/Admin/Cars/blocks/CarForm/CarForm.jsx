import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import validate from 'validate.js';
import _get from 'lodash/get';

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
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ErrorShower from '../../../../../organisms/Admin/ErrorShower';

import { ROLES } from '../../../../../../constants';

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

function CarForm(props) {
  const { texts, car, statuses, onCancel, onSubmit, onCloseError } = props;
  const styles = useStyles();
  const [yearStart, yearEnd] = car.years ? car.years.split(' - ') : ['', ''];
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      mark: car.mark || '',
      model: car.model || '',
      modification: car.modification || '',
      body_type: car.body_type || '',
      yearStart,
      yearEnd: yearEnd === 'по н.в.' ? '' : yearEnd,
      complectation: car.complectation || '',
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
  }, [formState.values, car.id]);

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
                error={hasError('mark')}
                helperText={hasError('mark') ? formState.errors.mark[0] : null}
                label="Марка"
                margin="dense"
                name="mark"
                onChange={handleChange}
                required
                value={formState.values.mark}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('model')}
                helperText={hasError('model') ? formState.errors.model[0] : null}
                label="Модель"
                margin="dense"
                name="model"
                onChange={handleChange}
                required
                value={formState.values.model}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('modification')}
                helperText={hasError('modification') ? formState.errors.modification[0] : null}
                label="Модификация"
                margin="dense"
                name="modification"
                onChange={handleChange}
                required
                value={formState.values.modification}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('body_type')}
                helperText={hasError('body_type') ? formState.errors.body_type[0] : null}
                label="Тип кузова"
                margin="dense"
                name="body_type"
                onChange={handleChange}
                required
                value={formState.values.body_type}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('complectation')}
                helperText={hasError('complectation') ? formState.errors.complectation[0] : null}
                label="Комплектация"
                margin="dense"
                name="complectation"
                onChange={handleChange}
                value={formState.values.complectation}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Годы выпуска</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('yearStart')}
                helperText={hasError('yearStart') ? formState.errors.yearStart[0] : null}
                label="Год начала выпуска"
                margin="dense"
                name="yearStart"
                onChange={handleChange}
                required
                value={formState.values.yearStart}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('yearEnd')}
                helperText={hasError('yearEnd') ? formState.errors.yearEnd[0] : null}
                label="Год окончания выпуска"
                margin="dense"
                name="yearEnd"
                onChange={handleChange}
                value={formState.values.yearEnd}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Если выпуск автомобиля еще не завершен - оставьте поле пустым
              </Typography>
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
          horizontal: 'right',
        }}
      />
    </Card>
  );
}

CarForm.propTypes = {
  texts: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    submit: PropTypes.string,
  }).isRequired,
  car: PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    role: PropTypes.oneOf(Object.values(ROLES)),
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseError: PropTypes.func.isRequired,
};

CarForm.defaultProps = {
  car: {
    id: null,
  },
};

export default CarForm;
