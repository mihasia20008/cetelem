import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { RoutesPaths } from '../constants';

import checkAuthStatus from '../utilities/checkAuthStatus';

function AdminRoute({ path, component: Component, ...restProps }) {
  const authorized = checkAuthStatus();

  return (
    <Route
      {...restProps}
      render={matchProps => {
        const { location } = matchProps;

        if (!authorized && location.pathname !== RoutesPaths.admin.login) {
          return <Redirect to={RoutesPaths.admin.login} />;
        }

        if (authorized && location.pathname === RoutesPaths.admin.login) {
          return <Redirect to={RoutesPaths.admin.main} />
        }

        return <Component {...matchProps} />;
      }}
    />
  );
}

export default AdminRoute;
