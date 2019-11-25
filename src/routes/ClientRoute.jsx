import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { RoutesPaths } from '../constants';

function ClientRoute({ path, component: Component, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={matchProps => {
        const { location } = matchProps;

        if (!('client_id' in location.query) && location.pathname !== RoutesPaths.wrong) {
          return <Redirect to={RoutesPaths.wrong} />;
        }

        return <Component {...matchProps} />;
      }}
    />
  );
}

export default ClientRoute;
