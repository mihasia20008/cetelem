import loginRequest from '../../../../api/user/login';

import { AUTH_KEY } from "../../../../constants";

import * as T from '../types';

export default function loginUser(username, password) {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_LOGIN_FETCH_START });
      const { data, error } = await loginRequest({ username, password });

      if (!error) {
        localStorage.setItem(AUTH_KEY, data.token);
        dispatch({ type: T.USER_LOGIN_SUCCESS, data: data.user });
        return;
      }

      dispatch({ type: T.USER_LOGIN_ERROR, data: error });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({ type: T.USER_LOGIN_ERROR, data: { message: 'Ошибка выполнения авторизации' } });
    } finally {
      dispatch({ type: T.USER_LOGIN_FETCH_END });
    }
  };
}
