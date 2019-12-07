import {
  RESERVATIONS_FETCH_START,
  RESERVATIONS_FETCH_END,
  RESERVATIONS_CLEAR_ERROR,
  RESERVATIONS_LIST_LOADED,
} from '../types';

import { getList as getListRequest } from '../../../../../api/admin/reservations';

export default function getUsers() {
  return async dispatch => {
    try {
      dispatch({ type: RESERVATIONS_FETCH_START });

      const { error, data } = await getListRequest();

      if (error) {
        dispatch({ type: RESERVATIONS_CLEAR_ERROR, data: error });
        return;
      }

      dispatch({ type: RESERVATIONS_LIST_LOADED, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: RESERVATIONS_CLEAR_ERROR,
        data: { message: 'Ошибка получения списка бронирований' },
      });
    } finally {
      dispatch({ type: RESERVATIONS_FETCH_END });
    }
  };
}
