import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { RoutesPaths } from '../constants';
import * as Pages from './pages';

import PageLoading from './PageLoading';
import AdminRoute from './AdminRoute';

export default () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      <Route exact path="/" component={Pages.Index} />
      <Route path={RoutesPaths.cars} component={Pages.Cars} />

      <AdminRoute exact path={RoutesPaths.admin.main} component={Pages.Admin} />
      <AdminRoute path={RoutesPaths.admin.login} component={Pages.AdminLogin} />
    </Switch>
  </Suspense>
);
