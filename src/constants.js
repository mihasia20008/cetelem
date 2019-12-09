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
  login: `${ADMIN_PREFIX}/login`,
  admin: {
    main: ADMIN_PREFIX,
    dashboard: `${ADMIN_PREFIX}/dashboard`,
    cars: `${ADMIN_PREFIX}/cars`,
    dealerCars: `${ADMIN_PREFIX}/dealer_cars`,
    users: `${ADMIN_PREFIX}/users`,
    reservations: `${ADMIN_PREFIX}/reservations`,
  },
  dealer: {
    main: DEALER_PREFIX,
    dashboard: `${DEALER_PREFIX}/dashboard`,
    cars: `${DEALER_PREFIX}/cars`,
    reservations: `${DEALER_PREFIX}/reservations`,
    personal: `${DEALER_PREFIX}/personal`,
  },
};

export const DEFAULT_ADMIN_PATH = RoutesPaths.admin.dashboard;
export const ADMIN_ROUTES_LIST = [
  `${RoutesPaths.admin.dashboard}`,
  `${RoutesPaths.admin.cars}`,
  `${RoutesPaths.admin.dealerCars}`,
  `${RoutesPaths.admin.users}`,
  `${RoutesPaths.admin.reservations}`,
];

export const DEFAULT_DEALER_PATH = RoutesPaths.dealer.dashboard;
export const DEALER_ROUTES_LIST = [
  `${RoutesPaths.dealer.dashboard}`,
  `${RoutesPaths.dealer.cars}`,
  `${RoutesPaths.dealer.reservations}`,
  `${RoutesPaths.dealer.personal}`,
];

export const CLIENT_ID_KEY = 'cetelem/client_id';
export const AUTH_TOKEN_KEY = 'cetelem/authorized';
export const USER_ID_KEY = 'cetelem/user/id';
export const DEALER_ID_KEY = 'cetelem/dealer/id';
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
