import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { RoutesPaths } from '../constants';
import * as Pages from './pages';

import PageLoading from './PageLoading';
import AdminRoute from './AdminRoute';

export default ({ authorized }) => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      <Route exact path="/" component={Pages.Index} />
      <Route path={RoutesPaths.cars} component={Pages.Cars} />

      <AdminRoute authorized={authorized} exact path={RoutesPaths.admin.main} component={Pages.Admin} />
      <AdminRoute authorized={authorized} path={RoutesPaths.admin.login} component={Pages.AdminLogin} />
    </Switch>
  </Suspense>
);
