import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  FormControl,
  CircularProgress,
  Radio,
  FormLabel,
  RadioGroup,
  Slider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ErrorShower from '../../../../organisms/Admin/ErrorShower';
import formatNumber from '../../../../../utilities/formatNumber';

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
  rangeWrap: {
    position: 'relative',
    paddingTop: '8px',
    margin: '0 8px 24px',
  },
  label: {
    position: 'absolute',
    top: '100%',
    fontSize: '16px',
  },
  minLabel: {
    left: '-5px',
  },
  maxLabel: {
    right: '-5px',
  },
}));

function FilterForm(props) {
  const {
    texts,
    defaultFilter,
    filters,
    statuses,
    onSubmit,
    onCloseError,
    onUpdateCar,
    onDeleteFilter,
  } = props;
  const styles = useStyles();

  const filtersMinPrice = _get(filters, 'data.price.min', 0);
  const filtersMaxPrice = _get(filters, 'data.price.max', 100);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      new: _get(defaultFilter, 'data.new', '-1'),
      mark_id: _get(defaultFilter, 'data.mark_id', -1),
      model_id: _get(defaultFilter, 'data.model_id', -1),
      price: {
        min: _get(defaultFilter, 'data.price.min', filtersMinPrice),
        max: _get(defaultFilter, 'data.price.max', filtersMaxPrice),
      },
    },
    touched: {},
  });
  const [loadedModelsForMark, setModelLoaded] = useState(formState.values.mark_id);

  useEffect(() => {
    if (formState.touched.mark_id && loadedModelsForMark !== formState.values.mark_id) {
      setModelLoaded(formState.values.mark_id);
      setFormState(oldFormState => ({
        ...oldFormState,
        values: {
          ...oldFormState.values,
          model_id: -1,
        },
        touched: {
          ...oldFormState.touched,
          model_id: false,
        },
      }));
      onUpdateCar(formState.values.mark_id);
    }
  }, [formState.values.mark_id, formState.touched.mark_id, onUpdateCar, loadedModelsForMark]);

  useEffect(() => {
    setFormState(oldFormState => ({
      ...oldFormState,
      isValid: !_isEqual(defaultFilter, formState.values),
    }));
  }, [defaultFilter, formState.values]);

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

  const handleRangeChange = (event, values) => {
    setFormState(oldFormState => ({
      ...oldFormState,
      values: {
        ...oldFormState.values,
        price: {
          min: values[0],
          max: values[1],
        },
      },
      touched: {
        ...oldFormState.touched,
        price: true,
      },
    }));
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    onSubmit(formState.values);
  };

  const marksOptions = _get(filters, 'data.mark_id.options', []).filter(item => item.id !== 0);
  const modelsOptions = _get(filters, 'data.model_id.options', []).filter(item => item.id !== 0);

  return (
    <Card className={styles.root}>
      <form autoComplete="off" noValidate onSubmit={handleSubmitForm}>
        <CardHeader subheader={texts.subtitle} title={texts.title} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Состояние автомобиля</FormLabel>
                <RadioGroup
                  aria-label="position"
                  name="new"
                  value={formState.values.new}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="-1"
                    control={<Radio color="primary" />}
                    label="Любой"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Новый"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Подержанный"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Выберите марку"
                margin="dense"
                name="mark_id"
                onChange={handleChange}
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={formState.values.mark_id}
                variant="outlined"
              >
                <option key="0" value={-1}>
                  Не выбрано
                </option>
                {marksOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Выберите модель"
                margin="dense"
                name="model_id"
                onChange={handleChange}
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={formState.values.model_id}
                variant="outlined"
              >
                <option key="0" value={-1}>
                  Не выбрано
                </option>
                {modelsOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography id="range-slider" gutterBottom>
                Цена
              </Typography>
              <div className={styles.rangeWrap}>
                <Slider
                  value={[formState.values.price.min, formState.values.price.max]}
                  onChange={handleRangeChange}
                  step={1}
                  min={filtersMinPrice}
                  max={filtersMaxPrice}
                  valueLabelDisplay="off"
                  aria-labelledby="price-range-slider"
                />
                <div className={cls(styles.label, styles.minLabel)}>
                  {formatNumber(formState.values.price.min)} ₽
                </div>
                <div className={cls(styles.label, styles.maxLabel)}>
                  {formatNumber(formState.values.price.max)} ₽
                </div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={styles.actionsWrap}>
          <div className={styles.confirmWrap}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!formState.isValid || statuses.loading}
            >
              {texts.submit}
            </Button>
            {statuses.loading && <CircularProgress size={24} className={styles.buttonProgress} />}
          </div>
          <Button color="primary" variant="outlined" disabled={!defaultFilter.id || statuses.loading} onClick={onDeleteFilter}>
            {texts.cancel}
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

FilterForm.propTypes = {
  texts: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    submit: PropTypes.string,
  }).isRequired,
  filter: PropTypes.shape({
    id: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCloseError: PropTypes.func.isRequired,
};

FilterForm.defaultProps = {
  filter: {
    id: null,
  },
};

export default FilterForm;
