import refreshRequest from '../../../../api/user/refresh';

import { AUTH_KEY } from "../../../../constants";

import * as T from '../types';

export default function refreshUser() {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_FETCH_START });
      const { data, error } = await refreshRequest();

      if (!error) {
        localStorage.setItem(AUTH_KEY, data.csrf);
        dispatch({ type: T.USER_LOGIN_SUCCESS, data: data.user });
        return;
      }

      localStorage.removeItem(AUTH_KEY);
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
