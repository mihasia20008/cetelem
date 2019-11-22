import axios from 'axios';

import { AUTH_KEY } from '../constants';

import * as userRequests from './user';

axios.interceptors.request.use(async (config) => {
  try {
    const token = localStorage !== undefined && localStorage.getItem(AUTH_KEY);
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        Authorization: `bearer ${token}`
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
  userRequests
};
