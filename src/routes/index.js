import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import * as Pages from './pages';

import PageLoading from './PageLoading';

export default () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      <Route exact path='/' component={Pages.Index} />
      <Route path='/cars' component={Pages.Cars} />
      <Route path='/admin' component={Pages.Admin} />
    </Switch>
  </Suspense>
);
