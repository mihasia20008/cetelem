import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './components/App';
import Routes from './routes';

import store from './redux/configureStore';

import history from './utilities/history';

render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Routes />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
