import { adminUsersRequests } from '../../../../../api';

import { USERS_FETCH_START, USERS_FETCH_END, USERS_FETCH_ERROR, USERS_LIST_LOADED } from '../types';

export default function getUsers() {
  return async dispatch => {
    try {
      dispatch({ type: USERS_FETCH_START });

      const { error, data } = await adminUsersRequests.getList();

      if (error) {
        dispatch({ type: USERS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: USERS_LIST_LOADED, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: USERS_FETCH_ERROR,
        data: { message: 'Ошибка получения списка пользователей' },
      });
    } finally {
      dispatch({ type: USERS_FETCH_END });
    }
  };
}
