import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './App';

import store from './redux/configureStore';

import history from './utilities/history';
import { LayoutContextProvider } from './utilities/layoutContext';

// /**
//  * Turns an array of promises into a promise for an array of their states (as
//  * returned by `inspect`) when they have all settled.
//  * @param {Array[Any*]} values an array (or promise for an array) of values (or
//  * promises for values)
//  * @returns {Array[State]} an array of states for the respective values.
//  */
// Promise.prototype.allSettled = function () {
//   return this.then((promises) => {
//     const wrappedPromises = promises.map(p => Promise.resolve(p)
//       .then(
//         val => ({ status: 'fulfilled', value: val }),
//         err => ({ status: 'rejected', reason: err })));
//     return Promise.all(wrappedPromises);
//   });
// };

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
