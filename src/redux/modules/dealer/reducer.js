import { combineReducers } from "redux";

import carsList from './carsList';
import reservations from './reservations';

export default combineReducers({
  carsList,
  reservations,
});
