const ADMIN_PREFIX = '/admin';
const DEALER_PREFIX = `${ADMIN_PREFIX}/dealer`;

export const ROLES = {
  ADMIN: 'admin',
  DEALER: 'dealer',
};

export const RoutesPaths = {
  index: '/',
  carsList: '/cars',
  carsDetail: '/cars/:id',
  dealers: '/dealers',
  wrong: '/wrong',
  admin: {
    main: ADMIN_PREFIX,
    login: `${ADMIN_PREFIX}/login`,
    dashboard: `${ADMIN_PREFIX}/dashboard`,
    cars: `${ADMIN_PREFIX}/cars`,
    users: `${ADMIN_PREFIX}/users`,
    reservations: `${ADMIN_PREFIX}/reservations`,
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
  `${RoutesPaths.admin.reservations}`,
];

export const DEFAULT_DEALER_PATH = RoutesPaths.admin.dealer.main;
export const DEALER_ROUTES_LIST = [
  `${RoutesPaths.admin.dealer.main}`,
];

export const AUTH_KEY = 'cetelem/authorized';
export const ENABLE_LOGGER = 'cetelem/enableReduxLogger';

export const FILTER_TYPES = {
  SELECT: 'select',
  RANGE: 'range',
  CHECKBOX: 'checkbox',
};

export const FILTER_NAMES = {
  CITY: 'CITY',
  SALON: 'SALON',
  SORT: 'SORT',
  TYPE: 'TYPE',
  PRICE: 'PRICE',
  MARK: 'MARK',
  MODEL: 'MODEL',
  GENERATION: 'GENERATION',
  YEAR: 'YEAR',
  GEAR: 'GEAR',
  BODY: 'BODY',
  COLOR: 'COLOR',
  TRANSMISSION: 'TRANSMISSION',
  LIMIT: 'LIMIT',
};

export const FILTERS_SORT = {
  HEAD: [FILTER_NAMES.CITY, FILTER_NAMES.SALON, FILTER_NAMES.SORT],
  SIDE: {
    TOP: [FILTER_NAMES.TYPE],
    BOTTOM: [
      FILTER_NAMES.PRICE,
      FILTER_NAMES.MARK,
      FILTER_NAMES.MODEL,
      FILTER_NAMES.GENERATION,
      FILTER_NAMES.YEAR,
      FILTER_NAMES.GEAR,
      FILTER_NAMES.BODY,
      FILTER_NAMES.COLOR,
      FILTER_NAMES.TRANSMISSION,
      FILTER_NAMES.LIMIT,
    ],
  },
};
