import { combineReducers } from "redux";

import users from './users';
import reservations from './reservations';
import cars from './cars';

export default combineReducers({
  users,
  reservations,
  cars,
});
