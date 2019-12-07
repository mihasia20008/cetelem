import { combineReducers } from "redux";

import user from './user';
import cars from './cars';

import admin from './admin/reducer';

export default combineReducers({
  user,
  cars,
  admin,
});
