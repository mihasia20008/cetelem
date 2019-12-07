import { combineReducers } from "redux";

import user from './user';
import cars from './cars';

import users from './users';

export default combineReducers({
  user,
  cars,
  admin: combineReducers({
    users,
  }),
});
