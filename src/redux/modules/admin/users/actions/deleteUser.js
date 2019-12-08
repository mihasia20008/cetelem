import { USERS_FETCH_START, USERS_FETCH_END, USERS_FETCH_ERROR, USERS_ITEM_DELETED } from '../types';

import { adminUsersRequests } from '../../../../../api';

export default function deleteUser(id) {
  return async dispatch => {
    try {
      dispatch({ type: USERS_FETCH_START });

      const { error } = await adminUsersRequests.deleteUser(id);

      if (error) {
        dispatch({ type: USERS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: USERS_ITEM_DELETED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: USERS_FETCH_ERROR,
        data: { message: 'Ошибка удаления пользователя' },
      });
    } finally {
      dispatch({ type: USERS_FETCH_END });
    }
  };
}
