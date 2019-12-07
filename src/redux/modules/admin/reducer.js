import { combineReducers } from "redux";

import users from './users';
import reservations from './reservations';

export default combineReducers({
  users,
  reservations,
});
