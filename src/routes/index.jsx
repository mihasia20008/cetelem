import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { RoutesPaths } from '../constants';
import * as Pages from './pages';

import PageLoading from './PageLoading';
import AdminRoute from './AdminRoute';

export default ({ authorized, userType }) => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      <Route exact path="/" component={Pages.Index} />
      <Route path={RoutesPaths.cars} component={Pages.Cars} />

      <AdminRoute
        authorized={authorized}
        userType={userType}
        path={RoutesPaths.admin.login}
        component={Pages.AdminLogin}
      />
      <AdminRoute
        authorized={authorized}
        userType={userType}
        path={RoutesPaths.admin.dashboard}
        component={Pages.AdminDashboard}
      />
      <AdminRoute
        authorized={authorized}
        userType={userType}
        path={RoutesPaths.admin.cars}
        component={Pages.AdminCars}
      />
      <AdminRoute
        authorized={authorized}
        userType={userType}
        path={RoutesPaths.admin.users}
        component={Pages.AdminUsers}
      />

      <Route
        path={RoutesPaths.admin.main}
        component={() => <Redirect to={RoutesPaths.admin.login} />}
      />
    </Switch>
  </Suspense>
);
