import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { stringify } from 'qs';

import { RoutesPaths, CLIENT_ID_KEY, CLIENT_NAME_KEY, CLIENT_PARAMS_KEY } from '../constants';

function RenderComponent({ matchProps, component: Component }) {
  const {
    location: { pathname, query = {} },
    history,
  } = matchProps;

  useEffect(() => {
    const keyFromStorage = localStorage.getItem(CLIENT_ID_KEY);

    if (query.client_id && keyFromStorage !== query.client_id) {
      localStorage.setItem(CLIENT_ID_KEY, query.client_id);

      if (query.name) {
        localStorage.setItem(CLIENT_NAME_KEY, query.name);
      }
      const params = {
        type: query.type || 1,
        brand: query.brand || '',
        model: query.model || '',
        price: query.price,
        rate: query.rate,
        downpayment: query.downpayment,
        monthlypayment: query.monthlypayment,
        sum: query.sum,
      };
      localStorage.setItem(CLIENT_PARAMS_KEY, JSON.stringify(params));
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
