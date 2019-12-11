import { carsRequests } from '../../../api';

import * as T from './types';

export function loadCarsList(query) {
  return async (dispatch, getStore) => {
    try {
      dispatch({ type: T.CARS_FETCH_START});
      const filters = getStore().filters.data;
      const { error, data } = await carsRequests.loadCarsList(query, filters);

      if (error) {
        dispatch({ type: T.CARS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: T.CARS_FETCH_SUCCESS, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({ type: T.CARS_FETCH_ERROR, data: { message: 'Ошибка получения списка автомобилей' } });
    } finally {
      dispatch({ type: T.CARS_FETCH_END });
    }
  };
}
