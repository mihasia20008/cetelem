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
      yearStart,
      yearEnd: yearEnd === 'по н.в.' ? '' : yearEnd,
      engine_type: car.engine_type || '',
      engine_volume: (car.engine_volume || '').toString(),
      engine_hp: (car.engine_hp || '').toString(),
      body_type: car.body_type || '',
      doors_count: (car.doors_count || '').toString(),
      drive: car.drive || '',
      gearbox: car.gearbox || '',
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
              <Typography variant="subtitle1">Основные характеристики</Typography>
            </Grid>
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
              <Typography variant="body2">
                Если выпуск автомобиля еще не завершен - оставьте поле пустым
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Двигатель</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('engine_type')}
                helperText={hasError('engine_type') ? formState.errors.engine_type[0] : null}
                label="Тип"
                margin="dense"
                name="engine_type"
                onChange={handleChange}
                value={formState.values.engine_type}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('engine_volume')}
                helperText={hasError('engine_volume') ? formState.errors.engine_volume[0] : null}
                label="Объем (л)"
                margin="dense"
                name="engine_volume"
                onChange={handleChange}
                value={formState.values.engine_volume}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('engine_hp')}
                helperText={hasError('engine_hp') ? formState.errors.engine_hp[0] : null}
                label="Мощность (л/с)"
                margin="dense"
                name="engine_hp"
                onChange={handleChange}
                value={formState.values.engine_hp}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Дополнительные характеристики</Typography>
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
                value={formState.values.body_type}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('doors_count')}
                helperText={hasError('doors_count') ? formState.errors.doors_count[0] : null}
                label="Количество дверей"
                margin="dense"
                name="doors_count"
                onChange={handleChange}
                value={formState.values.doors_count}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('drive')}
                helperText={hasError('drive') ? formState.errors.drive[0] : null}
                label="Привод"
                margin="dense"
                name="drive"
                onChange={handleChange}
                value={formState.values.drive}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('gearbox')}
                helperText={hasError('gearbox') ? formState.errors.gearbox[0] : null}
                label="Коробка передач"
                margin="dense"
                name="gearbox"
                onChange={handleChange}
                value={formState.values.gearbox}
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
