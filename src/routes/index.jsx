import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { RoutesPaths } from '../constants';
import * as Pages from './pages';

import PageLoading from './PageLoading';
import AdminRoute from './AdminRoute';

export default ({ authorized, userType }) => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      <Route exact path={RoutesPaths.index} component={() => <Redirect to={RoutesPaths.carsList} />} />
      <Route path={RoutesPaths.carsDetail} component={Pages.CarsDetail} />
      <Route path={RoutesPaths.carsList} component={Pages.CarsList} />

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
        path={RoutesPaths.admin.reservations}
        component={Pages.AdminReservations}
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
