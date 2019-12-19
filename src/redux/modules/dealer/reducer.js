import { combineReducers } from 'redux';

import carsList from './carsList';
import reservations from './reservations';
import info from './info';
import statistics from './statistics';

export default combineReducers({
  carsList,
  reservations,
  info,
  statistics,
});
