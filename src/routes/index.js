import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainAdmin from '../components/pages/MainAdmin';
import MainClient from '../components/pages/MainClient';

export default () => (
  <Switch>
    <Route exact path='/' component={MainClient} />
    <Route path='/admin' component={MainAdmin} />
  </Switch>
);
