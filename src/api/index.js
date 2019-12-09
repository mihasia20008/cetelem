import axios from 'axios';

import { AUTH_TOKEN_KEY } from '../constants';

import * as userRequests from './user';
import * as carsRequests from './cars';

import * as adminUsersRequests from './admin/users';
import * as adminCarsRequests from './admin/cars';
import * as adminDealerCarsRequests from './admin/dealerCars';
import * as adminReservationsRequests from './admin/reservations';

import * as dealerCarsListRequests from './dealer/carsList';
import * as dealerReservationsRequests from './dealer/reservations';

axios.interceptors.request.use(async config => {
  try {
    const token = localStorage !== undefined && localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        'X-CSRF-Token': token,
      };
    }
    return config;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return config;
  }
});

export {
  userRequests,
  carsRequests,

  adminUsersRequests,
  adminCarsRequests,
  adminDealerCarsRequests,
  adminReservationsRequests,

  dealerCarsListRequests,
  dealerReservationsRequests,
};
