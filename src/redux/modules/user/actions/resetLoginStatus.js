import { USER_RESET_STATUS } from '../types';

import { AUTH_KEY } from "../../../../constants";

export default function resetLoginStatus() {
  localStorage.removeItem(AUTH_KEY);
  return {
    type: USER_RESET_STATUS,
  };
}
