import { USER_RESET_STATUS } from '../types';

import { AUTH_TOKEN_KEY, USER_ID_KEY } from "../../../../constants";

export default function resetLoginStatus() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  return {
    type: USER_RESET_STATUS,
  };
}
