import { combineReducers } from "redux";

import cars from './cars';
import car from './car';
import book from './book';
import filters from './filters';
import location from './location';

import user from './user';
import admin from './admin/reducer';
import dealer from './dealer/reducer';

export default combineReducers({
  cars,
  car,
  book,
  filters,
  location,

  user,
  admin,
  dealer,
});
