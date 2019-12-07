import {
  CARS_FETCH_START,
  CARS_FETCH_END,
  CARS_FETCH_ERROR,
  CARS_LIST_LOADED,
} from '../types';

import { getList as getListRequest } from '../../../../../api/admin/cars';

export default function getUsers() {
  return async dispatch => {
    try {
      dispatch({ type: CARS_FETCH_START });

      const { error, data } = await getListRequest();

      if (error) {
        dispatch({ type: CARS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: CARS_LIST_LOADED, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: CARS_FETCH_ERROR,
        data: { message: 'Ошибка получения списка автомобилей' },
      });
    } finally {
      dispatch({ type: CARS_FETCH_END });
    }
  };
}
