import { USERS_FETCH_START, USERS_FETCH_END, USERS_FETCH_ERROR, USERS_ITEM_CREATED } from '../types';

import { adminUsersRequests } from '../../../../../api';

export default function createUser(form) {
  return async dispatch => {
    try {
      dispatch({ type: USERS_FETCH_START });

      const { error } = await adminUsersRequests.createUser(form);

      if (error) {
        dispatch({ type: USERS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: USERS_ITEM_CREATED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: USERS_FETCH_ERROR,
        data: { message: 'Ошибка создания пользователя' },
      });
    } finally {
      dispatch({ type: USERS_FETCH_END });
    }
  };
}
