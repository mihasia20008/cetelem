import { userRequests } from '../../../../api';

import { AUTH_TOKEN_KEY, USER_ID_KEY, DEALER_ID_KEY, ROLES } from "../../../../constants";

import * as T from '../types';

export default function tryLogin(login, password) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_FETCH_START });
      const { data, error } = await userRequests.login({ login, password });

      if (error) {
        dispatch({ type: T.USER_FETCH_ERROR, data: error });
        return;
      }

      localStorage.setItem(AUTH_TOKEN_KEY, data.csrf);
      localStorage.setItem(USER_ID_KEY, data.user.id);
      if (data.user.role === ROLES.DEALER) {
        localStorage.setItem(DEALER_ID_KEY, 1);
        // localStorage.setItem(DEALER_ID_KEY, data.user.dealer_id);
      }
      dispatch({ type: T.USER_LOGIN_SUCCESS, data: data.user });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({ type: T.USER_FETCH_ERROR, data: { message: 'Ошибка выполнения авторизации' } });
    } finally {
      dispatch({ type: T.USER_FETCH_END });
    }
  };
}
