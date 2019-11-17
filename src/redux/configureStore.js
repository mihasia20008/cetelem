import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './modules/reducer';

export const getEnhancer = () => {
  if (
    process.env.NODE_ENV === 'production' ||
    typeof window === 'undefined' ||
    // eslint-disable-next-line no-underscore-dangle
    !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    return compose;
  }

  return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    serialize: true,
    serializeAction: (key, value) => {
      if (typeof value === 'symbol') {
        return String(value);
      }
      return value;
    },
  });
};

function createStore(initialStore) {
  let middleware = [thunkMiddleware];

  if (
    process.env.NODE_ENV !== 'production' &&
    localStorage.getItem('OTT/hotels/enableReduxLogger')
  ) {
    const logger = createLogger({
      collapsed: (getState, action, logEntry) => !logEntry.error,
    });

    middleware.push(logger);
  }

  middleware = applyMiddleware(...middleware);

  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = getEnhancer();
    middleware = composeEnhancers(middleware);
  }

  const store = reduxCreateStore(rootReducer, initialStore, middleware);

  if (process.env.NODE_ENV !== 'production') {
    global.reducer = store;
  }

  if (module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}

export default createStore();
