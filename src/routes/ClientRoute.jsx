import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { stringify } from 'qs';

import { RoutesPaths, CLIENT_ID_KEY, CLIENT_NAME_KEY } from '../constants';

function RenderComponent({ matchProps, component: Component }) {
  const {
    location: { pathname, query = {} },
    history,
  } = matchProps;

  useEffect(() => {
    const keyFromStorage = localStorage.getItem(CLIENT_ID_KEY);
    const nameFromStorage = localStorage.getItem(CLIENT_NAME_KEY);

    if (query.client_id && keyFromStorage !== query.client_id) {
      localStorage.setItem(CLIENT_ID_KEY, query.client_id);
    }
    if (query.name && nameFromStorage !== query.name) {
      localStorage.setItem(CLIENT_NAME_KEY, query.name);
    }

    if (keyFromStorage && !query.client_id) {
      history.replace(`${pathname}?${stringify({ ...query, client_id: keyFromStorage })}`)
    }
  });

  if (
    !('client_id' in query) &&
    !localStorage.getItem(CLIENT_ID_KEY) &&
    pathname !== RoutesPaths.wrong
  ) {
    return <Redirect to={RoutesPaths.wrong} />;
  }

  return <Component {...matchProps} />;
}

function ClientRoute({ path, component, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={matchProps => <RenderComponent matchProps={matchProps} component={component} />}
    />
  );
}

export default ClientRoute;
