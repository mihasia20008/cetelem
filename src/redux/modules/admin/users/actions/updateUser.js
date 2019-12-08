import _omitBy from 'lodash/omitBy';

import { USERS_FETCH_START, USERS_FETCH_END, USERS_FETCH_ERROR, USERS_ITEM_UPDATED } from '../types';

import { adminUsersRequests } from '../../../../../api';

export default function updateUser(id, values) {
  return async dispatch => {
    try {
      dispatch({ type: USERS_FETCH_START });

      const form = _omitBy(values, (value) => !value);
      const { error } = await adminUsersRequests.updateUser(id, form);

      if (error) {
        dispatch({ type: USERS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: USERS_ITEM_UPDATED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: USERS_FETCH_ERROR,
        data: { message: 'Ошибка изменения пользователя' },
      });
    } finally {
      dispatch({ type: USERS_FETCH_END });
    }
  };
}
