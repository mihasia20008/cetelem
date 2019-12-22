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
    filters: `${ADMIN_PREFIX}/filters`,
    dealerCars: `${ADMIN_PREFIX}/dealer_cars`,
    dealersList: `${ADMIN_PREFIX}/dealers_list`,
    users: `${ADMIN_PREFIX}/users`,
    groups: `${ADMIN_PREFIX}/groups`,
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
  `${RoutesPaths.admin.filters}`,
  `${RoutesPaths.admin.dealerCars}`,
  `${RoutesPaths.admin.dealersList}`,
  `${RoutesPaths.admin.users}`,
  `${RoutesPaths.admin.groups}`,
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
export const CLIENT_NAME_KEY = 'cetelem/client_name';
export const CLIENT_PARAMS_KEY = 'cetelem/client_params';
export const CLIENT_LOCATION_KEY = 'cetelem/client_location';
export const AUTH_TOKEN_KEY = 'cetelem/authorized';
export const USER_ID_KEY = 'cetelem/user/id';
export const DEALER_ID_KEY = 'cetelem/dealer/id';
export const ENABLE_LOGGER = 'cetelem/enableReduxLogger';

export const FILTER_TYPES = {
  SELECT: 'SELECT',
  RANGE: 'RANGE',
  CHECKBOX: 'BOOLEAN',
};

export const FILTER_NAMES = {
  CITY: 'region_id',
  DEALER_ID: 'dealer_id',
  SORT: 'SORT',
  //
  NEW: 'new',
  AVAILABLE: 'availability',
  PRICE: 'price',
  MARK: 'mark_id',
  MODEL: 'model_id',
  MODIFICATION: 'modification_id',
  COMPLECTATION: 'complectation_id',
  YEAR: 'year',
  BODY_TYPE: 'body_type',
  DRIVE: 'drive',
  COLOR: 'color',
  ENGINE_HP: 'engine_hp',
  ENGINE_TYPE: 'engine_type',
  ENGINE_VOLUME: 'engine_volume',
  RUN: 'run',
  STATE: 'state',
  WHEEL: 'wheel',
};

export const BASE_FILTERS = [
  FILTER_NAMES.NEW,
  FILTER_NAMES.AVAILABLE,
  FILTER_NAMES.PRICE,
  FILTER_NAMES.YEAR,
  FILTER_NAMES.BODY_TYPE,
  FILTER_NAMES.DRIVE,
  FILTER_NAMES.ENGINE_HP,
  FILTER_NAMES.ENGINE_TYPE,
  FILTER_NAMES.ENGINE_VOLUME,
  FILTER_NAMES.RUN,
  FILTER_NAMES.STATE,
  FILTER_NAMES.WHEEL,
];

export const FILTERS_SORT = {
  HEAD: [
    FILTER_NAMES.CITY,
    FILTER_NAMES.DEALER_ID,
    FILTER_NAMES.SORT
  ],
  SIDE: {
    TOP: [
      FILTER_NAMES.NEW,
    ],
    BOTTOM: [
      FILTER_NAMES.PRICE,
      FILTER_NAMES.MARK,
      FILTER_NAMES.MODEL,
      FILTER_NAMES.MODIFICATION,
      FILTER_NAMES.COMPLECTATION,
      FILTER_NAMES.YEAR,
      FILTER_NAMES.RUN,
      FILTER_NAMES.BODY_TYPE,
      FILTER_NAMES.DRIVE,
      FILTER_NAMES.ENGINE_TYPE,
      FILTER_NAMES.ENGINE_VOLUME,
      FILTER_NAMES.ENGINE_HP,
      FILTER_NAMES.WHEEL,
      FILTER_NAMES.COLOR,
      FILTER_NAMES.AVAILABLE,
      FILTER_NAMES.STATE,
    ],
  },
};
