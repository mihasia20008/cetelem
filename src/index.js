import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './App';

import store from './redux/configureStore';

import history from './utilities/history';
import { LayoutContextProvider } from './utilities/layoutContext';

render(
  <Provider store={store}>
    <LayoutContextProvider>
      <Router history={history}>
        <App />
      </Router>
    </LayoutContextProvider>
  </Provider>,
  document.getElementById('root')
);
