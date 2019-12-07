import loginRequest from '../../../../api/user/login';

import { AUTH_KEY } from "../../../../constants";

import * as T from '../types';

export default function loginUser(login, password) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_FETCH_START });
      const { data, error } = await loginRequest({ login, password });

      if (error) {
        dispatch({ type: T.USER_FETCH_ERROR, data: error });
        return;
      }

      localStorage.setItem(AUTH_KEY, data.csrf);
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
