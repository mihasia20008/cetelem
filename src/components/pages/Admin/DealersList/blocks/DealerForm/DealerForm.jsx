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
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/styles';

import ErrorShower from '../../../../../organisms/Admin/ErrorShower';

import { dealerSchema } from './schema';
import AutoComplete from './Autocomplete';

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

function DealerForm(props) {
  const { texts, dealer, groups, statuses, onCancel, onSubmit, onCloseError } = props;
  const styles = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      trade_name: dealer.trade_name || '',
      legal_name: dealer.legal_name || '',
      official_dealer: Boolean(dealer.official_dealer),
      dealer_group_id: (groups.find(group => group.id === dealer.dealer_group_id) || []).id || 0,
      used_car_saling: Boolean(dealer.used_car_saling),
      phone: _get(dealer, 'contact_infos.0.value', ''),
      code: dealer.code || '',
      rate: _get(dealer, 'rate', 0),
      postcode: _get(dealer, 'address.postcode', ''),
      country: _get(dealer, 'address.country', ''),
      region: _get(dealer, 'address.region', ''),
      regionId: _get(dealer, 'address.region_id', -1),
      city: _get(dealer, 'address.city', ''),
      cityId: _get(dealer, 'address.city_id', -1),
      street: _get(dealer, 'address.street', ''),
      building: _get(dealer, 'address.building', ''),
      locationX: _get(dealer, 'address.location.x', ''),
      locationY: _get(dealer, 'address.location.y', ''),
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, dealerSchema);

    setFormState(oldFormState => ({
      ...oldFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values, dealer.id]);

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

  const changeRating = (event, value) => {
    event.persist();
    const { name } = event.target;
    setFormState(oldFormState => ({
      ...oldFormState,
      values: {
        ...oldFormState.values,
        [name]: value,
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

  const handleSelect = (type, selected) => {
    if (!selected) {
      if (type === 'regions') {
        setFormState(oldFormState => ({
          ...oldFormState,
          values: {
            ...oldFormState.values,
            regionId: -1,
            region: '',
            cityId: -1,
            city: '',
          },
        }));
      } else {
        setFormState(oldFormState => ({
          ...oldFormState,
          values: {
            ...oldFormState.values,
            cityId: -1,
            city: '',
          },
        }));
      }
      return;
    }
    if (type === 'regions') {
      setFormState(oldFormState => ({
        ...oldFormState,
        values: {
          ...oldFormState.values,
          regionId: selected.id,
          region: selected.name,
        },
        touched: {
          ...oldFormState.touched,
          region: true,
        },
      }));
    } else {
      setFormState(oldFormState => ({
        ...oldFormState,
        values: {
          ...oldFormState.values,
          cityId: selected.id,
          city: selected.name,
        },
        touched: {
          ...oldFormState.touched,
          city: true,
        },
      }));
    }
  };

  return (
    <Card className={styles.root}>
      <form autoComplete="off" noValidate onSubmit={handleSubmitForm}>
        <CardHeader subheader={texts.subtitle} title={texts.title} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Общая информация</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('legal_name')}
                helperText={hasError('legal_name') ? formState.errors.legal_name[0] : null}
                label="Юридическое название ДЦ"
                margin="dense"
                name="legal_name"
                onChange={handleChange}
                required
                value={formState.values.legal_name}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('trade_name')}
                helperText={hasError('trade_name') ? formState.errors.trade_name[0] : null}
                label="Торговое название ДЦ"
                margin="dense"
                name="trade_name"
                onChange={handleChange}
                required
                value={formState.values.trade_name}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('phone')}
                helperText={hasError('phone') ? formState.errors.phone[0] : null}
                label="Номер телефона"
                margin="dense"
                name="phone"
                onChange={handleChange}
                required
                value={formState.values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Выберите сеть"
                error={hasError('dealer_group_id')}
                helperText={hasError('dealer_group_id') ? formState.errors.dealer_group_id[0] : null}
                margin="dense"
                name="dealer_group_id"
                onChange={handleChange}
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={formState.values.dealer_group_id}
                variant="outlined"
              >
                <option key="0" value={0}>
                  Не выбрано
                </option>
                {groups.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('code')}
                helperText={hasError('code') ? formState.errors.code[0] : null}
                label="Код ДЦ"
                margin="dense"
                name="code"
                onChange={handleChange}
                value={formState.values.code}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Официальный дилер"
                name="official_dealer"
                checked={formState.values.official_dealer}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Продажа б/у"
                name="used_car_saling"
                checked={formState.values.used_car_saling}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Рейтинг</Typography>
              <Rating name="rate" value={formState.values.rate} onChange={changeRating} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Фактический адрес</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('postcode')}
                helperText={hasError('postcode') ? formState.errors.postcode[0] : null}
                label="Почтовый индекс"
                margin="dense"
                name="postcode"
                onChange={handleChange}
                value={formState.values.postcode}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('country')}
                helperText={hasError('country') ? formState.errors.country[0] : null}
                label="Страна"
                margin="dense"
                name="country"
                onChange={handleChange}
                value={formState.values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <AutoComplete
                type="regions"
                label="Регион"
                id={formState.values.regionId}
                value={formState.values.region}
                error={hasError('region')}
                helperText={hasError('region') ? formState.errors.region[0] : null}
                onSelect={handleSelect}
              />
            </Grid>
            <Grid item xs={12}>
              <AutoComplete
                type="cities"
                label="Город"
                id={formState.values.cityId}
                value={formState.values.city}
                error={hasError('city')}
                helperText={hasError('city') ? formState.errors.city[0] : null}
                onSelect={handleSelect}
                regionId={formState.values.regionId}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('street')}
                helperText={hasError('street') ? formState.errors.street[0] : null}
                label="Улица"
                margin="dense"
                name="street"
                onChange={handleChange}
                required
                value={formState.values.street}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('building')}
                helperText={hasError('building') ? formState.errors.building[0] : null}
                label="Номер дома"
                margin="dense"
                name="building"
                onChange={handleChange}
                required
                value={formState.values.building}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Координаты</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('locationX')}
                helperText={hasError('locationX') ? formState.errors.locationX[0] : null}
                label="Широта"
                margin="dense"
                name="locationX"
                onChange={handleChange}
                required
                value={formState.values.locationX}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={hasError('locationY')}
                helperText={hasError('locationY') ? formState.errors.locationY[0] : null}
                label="Долгота"
                margin="dense"
                name="locationY"
                onChange={handleChange}
                required
                value={formState.values.locationY}
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

DealerForm.propTypes = {
  texts: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    submit: PropTypes.string,
  }).isRequired,
  dealer: PropTypes.shape({
    id: PropTypes.number,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseError: PropTypes.func.isRequired,
};

DealerForm.defaultProps = {
  dealer: {
    id: null,
  },
};

export default DealerForm;
