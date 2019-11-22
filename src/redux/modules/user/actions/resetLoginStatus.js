import { USER_RESET_LOGIN_STATUS } from '../types';

export default function resetLoginStatus() {
  return {
    type: USER_RESET_LOGIN_STATUS,
  };
}
