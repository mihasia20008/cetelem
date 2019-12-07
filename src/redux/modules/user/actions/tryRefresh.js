import { refresh as refreshRequest } from "../../../../api/user";

import { AUTH_TOKEN_KEY } from "../../../../constants";

import * as T from '../types';

export default function tryRefresh() {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_FETCH_START });
      const { data, error } = await refreshRequest();

      if (!error) {
        localStorage.setItem(AUTH_TOKEN_KEY, data.csrf);
        dispatch({ type: T.USER_LOGIN_SUCCESS, data: data.user });
        return;
      }

      localStorage.removeItem(AUTH_TOKEN_KEY);
      dispatch({ type: T.USER_FETCH_ERROR, data: error });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({ type: T.USER_FETCH_ERROR, data: { message: 'Ошибка выполнения авторизации' } });
    } finally {
      dispatch({ type: T.USER_FETCH_END });
    }
  };
}
