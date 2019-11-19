const AdminPrefix = '/admin';

export const RoutesPaths = {
  cars: '/cars',
  dealers: '/dealers',
  admin: {
    main: AdminPrefix,
    login: `${AdminPrefix}/login`,
  },
};

export const AUTH_KEY = 'cetelem/authorized';
