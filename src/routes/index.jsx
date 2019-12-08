import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { RoutesPaths } from '../constants';
import * as Pages from './pages';

import PageLoading from './PageLoading';
import AdminRoute from './AdminRoute';
import ClientRoute from './ClientRoute';

export default function Routes({ authorized, userType }) {
  const AdminRoutesList = () => [
    <AdminRoute
      key={RoutesPaths.admin.dashboard}
      path={RoutesPaths.admin.dashboard}
      component={Pages.AdminDashboard}
      authorized={authorized}
      userType={userType}
    />,
    <AdminRoute
      key={RoutesPaths.admin.cars}
      path={RoutesPaths.admin.cars}
      component={Pages.AdminCars}
      authorized={authorized}
      userType={userType}
    />,
    <AdminRoute
      key={RoutesPaths.admin.dealerCars}
      path={RoutesPaths.admin.dealerCars}
      component={Pages.AdminDealerCars}
      authorized={authorized}
      userType={userType}
    />,
    <AdminRoute
      key={RoutesPaths.admin.reservations}
      path={RoutesPaths.admin.reservations}
      component={Pages.AdminReservations}
      authorized={authorized}
      userType={userType}
    />,
    <AdminRoute
      key={RoutesPaths.admin.users}
      path={RoutesPaths.admin.users}
      component={Pages.AdminUsers}
      authorized={authorized}
      userType={userType}
    />,
    <Route
      key={RoutesPaths.admin.main}
      path={RoutesPaths.admin.main}
      component={() => <Redirect to={RoutesPaths.login} />}
    />,
  ];

  const DealerRoutesList = () => [
    <AdminRoute
      key={RoutesPaths.dealer.dashboard}
      path={RoutesPaths.dealer.dashboard}
      component={Pages.DealerDashboard}
      authorized={authorized}
      userType={userType}
    />,
    <AdminRoute
      key={RoutesPaths.dealer.cars}
      path={RoutesPaths.dealer.cars}
      component={Pages.DealerCarsList}
      authorized={authorized}
      userType={userType}
    />,
    <AdminRoute
      key={RoutesPaths.dealer.reservations}
      path={RoutesPaths.dealer.reservations}
      component={Pages.DealerDashboard}
      authorized={authorized}
      userType={userType}
    />,
    <AdminRoute
      key={RoutesPaths.dealer.personal}
      path={RoutesPaths.dealer.personal}
      component={Pages.DealerDashboard}
      authorized={authorized}
      userType={userType}
    />,
    <Route
      key={RoutesPaths.dealer.main}
      path={RoutesPaths.dealer.main}
      component={() => <Redirect to={RoutesPaths.login} />}
    />,
  ];

  const ClientRoutesList = () => [
    <ClientRoute
      key={RoutesPaths.carsDetail}
      path={RoutesPaths.carsDetail}
      component={Pages.CarsDetail}
    />,
    <ClientRoute
      key={RoutesPaths.carsList}
      path={RoutesPaths.carsList}
      component={Pages.CarsList}
    />,
    <ClientRoute
      key={RoutesPaths.wrong}
      path={RoutesPaths.wrong}
      component={Pages.WrongUserPage}
    />,
  ];

  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route
          exact
          path={RoutesPaths.index}
          component={() => <Redirect to={RoutesPaths.carsList} />}
        />
        {ClientRoutesList()}

        <AdminRoute
          authorized={authorized}
          userType={userType}
          path={RoutesPaths.login}
          component={Pages.AdminLogin}
        />

        {DealerRoutesList()}

        {AdminRoutesList()}
      </Switch>
    </Suspense>
  );
}
