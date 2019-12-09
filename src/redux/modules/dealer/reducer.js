import { combineReducers } from "redux";

import carsList from './carsList';
import reservations from './reservations';
import info from './info';

export default combineReducers({
  carsList,
  reservations,
  info,
});
