import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
  RoutesPaths,
  ROLES,
  ADMIN_ROUTES_LIST,
  DEFAULT_ADMIN_PATH,
  DEALER_ROUTES_LIST,
  DEFAULT_DEALER_PATH,
} from '../constants';

function AdminRoute({ authorized, userType, path, component: Component, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={matchProps => {
        const { location } = matchProps;

        if (!authorized && location.pathname !== RoutesPaths.login) {
          return <Redirect to={RoutesPaths.login} />;
        }

        if (userType === ROLES.ADMIN && !ADMIN_ROUTES_LIST.includes(location.pathname)) {
          return <Redirect to={DEFAULT_ADMIN_PATH} />;
        }

        if (userType === ROLES.DEALER && !DEALER_ROUTES_LIST.includes(location.pathname)) {
          return <Redirect to={DEFAULT_DEALER_PATH} />;
        }

        return <Component {...matchProps} />;
      }}
    />
  );
}

export default AdminRoute;
