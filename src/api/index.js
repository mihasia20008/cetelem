import axios from 'axios';

import { AUTH_TOKEN_KEY } from '../constants';

import * as userRequests from './user';
import * as carsRequests from './cars';
import * as filtersRequests from './filters';
import * as locationRequests from './location';

import * as adminUsersRequests from './admin/users';
import * as adminCarsRequests from './admin/cars';
import * as adminDealerCarsRequests from './admin/dealerCars';
import * as adminDealersRequests from './admin/dealersList';
import * as adminReservationsRequests from './admin/reservations';
import * as adminDefaultFilterRequests from './admin/defaultFilter';
import * as adminDealerGroupsRequests from './admin/groups';
import * as adminStatisticsRequests from './admin/statistics';

import * as dealerCarsListRequests from './dealer/carsList';
import * as dealerReservationsRequests from './dealer/reservations';
import * as dealerInfoRequests from './dealer/info';
import * as dealerStatisticsRequests from './dealer/statistics';

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
  filtersRequests,
  locationRequests,

  adminUsersRequests,
  adminCarsRequests,
  adminDealersRequests,
  adminDealerCarsRequests,
  adminReservationsRequests,
  adminDefaultFilterRequests,
  adminDealerGroupsRequests,
  adminStatisticsRequests,

  dealerCarsListRequests,
  dealerReservationsRequests,
  dealerInfoRequests,
  dealerStatisticsRequests,
};
