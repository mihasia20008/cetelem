import { access as accessRequest } from '../../../../api/user';

import { USER_ID_KEY } from '../../../../constants';

import * as T from '../types';

export default function tryAccess() {
  return async dispatch => {
    try {
      dispatch({ type: T.USER_FETCH_START });
      const { data, error } = await accessRequest();

      if (error) {
        dispatch({ type: T.USER_FETCH_ERROR, data: error });
        return;
      }

      localStorage.setItem(USER_ID_KEY, data.id);
      dispatch({ type: T.USER_LOGIN_SUCCESS, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({ type: T.USER_FETCH_ERROR, data: { message: 'Ошибка выполнения авторизации' } });
    } finally {
      dispatch({ type: T.USER_FETCH_END });
    }
  };
}
