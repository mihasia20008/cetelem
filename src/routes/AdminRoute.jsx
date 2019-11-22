import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { RoutesPaths } from '../constants';

function AdminRoute({ authorized, path, component: Component, ...restProps }) {
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
