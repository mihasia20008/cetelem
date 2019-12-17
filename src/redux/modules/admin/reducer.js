import { combineReducers } from "redux";

import users from './users';
import reservations from './reservations';
import cars from './cars';
import filtersDefault from './filtersDefault';
import dealerCars from './dealerCars';
import dealersList from './dealersList';

export default combineReducers({
  users,
  reservations,
  cars,
  filtersDefault,
  dealerCars,
  dealersList,
});
