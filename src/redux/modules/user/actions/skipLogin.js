import { USER_SKIP_LOGIN } from '../types';

export default function skipLogin() {
  return {
    type: USER_SKIP_LOGIN,
  };
}
