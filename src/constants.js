const ADMIN_PREFIX = '/admin';
const DEALER_PREFIX = `${ADMIN_PREFIX}/dealer`;

export const ROLES = {
  ADMIN: 0,
  DEALER: 1,
};

export const RoutesPaths = {
  cars: '/cars',
  dealers: '/dealers',
  admin: {
    main: ADMIN_PREFIX,
    login: `${ADMIN_PREFIX}/login`,
    dashboard: `${ADMIN_PREFIX}/dashboard`,
    cars: `${ADMIN_PREFIX}/cars`,
    users: `${ADMIN_PREFIX}/users`,
    dealer: {
      main: DEALER_PREFIX,
    },
  },
};

export const DEFAULT_ADMIN_PATH = RoutesPaths.admin.main;
export const ADMIN_ROUTES_LIST = [
  `${RoutesPaths.admin.dashboard}`,
  `${RoutesPaths.admin.cars}`,
  `${RoutesPaths.admin.users}`,
];

export const DEFAULT_DEALER_PATH = RoutesPaths.admin.dealer.main;
export const DEALER_ROUTES_LIST = [
  `${RoutesPaths.admin.dealer.main}`,
];

export const AUTH_KEY = 'cetelem/authorized';
export const ENABLE_LOGGER = 'cetelem/enableReduxLogger';
