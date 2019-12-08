import { combineReducers } from "redux";

import user from './user';
import cars from './cars';

import admin from './admin/reducer';
import dealer from './dealer/reducer';

export default combineReducers({
  user,
  cars,
  admin,
  dealer,
});
